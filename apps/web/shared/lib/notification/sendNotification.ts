import webpush from 'web-push';

import { AuctionWithProduct } from '@/shared/types/db';

import { adminClient } from '@/app/admin';

interface NotificationConfig {
  userId: string;
  auctionId: string;
  title: string;
  body: string;
  type: 'auction_outbid' | 'auction_won' | 'auction_lost' | 'auction_no_bid';
  data: Record<string, any>;
}

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey!,
  vapidKeys.privateKey!
);

export const sendNotificationAsync = (config: NotificationConfig) => {
  setImmediate(async () => {
    try {
      // 1. 경매 정보 조회
      const { data: auctionData, error: auctionError } = (await adminClient
        .from('auction')
        .select(
          `
          auction_id,
          product:product_id (
            name
          )
        `
        )
        .eq('auction_id', config.auctionId)
        .single()) as { data: AuctionWithProduct | null; error: any };

      if (auctionError || !auctionData) {
        console.error('[sendNotificationAsync] 경매 정보 조회 실패:', auctionError);
        return;
      }

      const productName = auctionData.product.name;

      // 2. 모든 활성 구독 정보 조회 (single 제거)
      const { data: subscriptionsData, error: subscriptionError } = await adminClient
        .from('push_subscriptions')
        .select('endpoint, p256dh, auth, user_agent')
        .eq('user_id', config.userId)
        .eq('is_active', true); // 활성 구독만

      // 3. 알림 내역 저장용 데이터 (한 번만 저장)
      const notificationData = {
        user_id: config.userId,
        auction_id: config.auctionId,
        title: config.title,
        body: config.body,
        type: config.type,
        data: {
          ...config.data,
          product_name: productName,
        },
        sent_at: new Date().toISOString(),
      };

      if (subscriptionError || !subscriptionsData || subscriptionsData.length === 0) {
        console.warn(
          `[sendNotificationAsync] 사용자 ${config.userId}는 활성 푸시 알림 구독이 없음. Error:`,
          subscriptionError
        );

        // 알림 히스토리에 1개만 저장
        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: 'not_subscribed',
        });

        console.log(
          `[sendNotificationAsync] 알림 상태 기록: not_subscribed for userId: ${config.userId}`
        );
        return;
      }

      console.log(
        `[sendNotificationAsync] 사용자 ${config.userId}의 활성 구독 ${subscriptionsData.length}개 발견`
      );

      // 4. 모든 기기에 푸시 알림 전송
      const pushResults = await Promise.allSettled(
        subscriptionsData.map(async (subscription) => {
          try {
            const pushSubscription = {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
              },
            };

            const pushPayload = JSON.stringify({
              title: config.title,
              body: config.body,
              url: `/auction/${config.auctionId}/auction-detail`,
            });
            await webpush.sendNotification(pushSubscription, pushPayload);

            console.log(
              `[sendNotificationAsync] 푸시 전송 성공: ${subscription.endpoint.slice(-10)}...`
            );
            return { success: true, endpoint: subscription.endpoint };
          } catch (pushError: any) {
            console.error(
              `[sendNotificationAsync] 푸시 전송 실패: ${subscription.endpoint.slice(-10)}...`,
              pushError
            );

            // 구독 만료된 경우 비활성화
            if (pushError.statusCode === 410 || pushError.statusCode === 404) {
              console.warn(
                `[sendNotificationAsync] 구독 만료, 비활성화 처리: ${subscription.endpoint.slice(-10)}...`
              );

              await adminClient
                .from('push_subscriptions')
                .update({ is_active: false })
                .eq('endpoint', subscription.endpoint);
            }

            return { success: false, endpoint: subscription.endpoint, error: pushError };
          }
        })
      );

      // 5. 결과 분석 및 알림 히스토리 저장
      const successCount = pushResults.filter(
        (result) => result.status === 'fulfilled' && result.value.success
      ).length;

      const totalCount = subscriptionsData.length;

      let deliveryStatus: string;
      if (successCount === totalCount) {
        deliveryStatus = 'sent'; // 모든 기기 성공
      } else if (successCount > 0) {
        deliveryStatus = 'partial'; // 일부 기기 성공
      } else {
        deliveryStatus = 'failed'; // 모든 기기 실패
      }

      // 알림 히스토리에 1개 레코드만 저장
      await adminClient.from('notification').insert({
        ...notificationData,
        delivery_status: deliveryStatus,
      });

      console.log(
        `[sendNotificationAsync] 알림 전송 완료! userId: ${config.userId}, 성공: ${successCount}/${totalCount}, 상태: ${deliveryStatus}`
      );
    } catch (error) {
      console.error('[sendNotificationAsync] 알림 처리 중 예상치 못한 오류:', error);
    }
  });
};
