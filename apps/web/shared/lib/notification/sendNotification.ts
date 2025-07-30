import webpush from 'web-push';
import { adminClient } from '@/app/admin';
import { AuctionWithProduct } from '@/shared/types/db';

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

console.log('VAPID Public Key (Server):', vapidKeys.publicKey);

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey!,
  vapidKeys.privateKey!
);

export const sendNotificationAsync = (config: NotificationConfig) => {
  setImmediate(async () => {
    try {
      console.log(
        `[sendNotificationAsync] 알림 전송 시작. userId: ${config.userId}, auctionId: ${config.auctionId}, type: ${config.type}`
      );

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

      // 2. 구독 정보 조회
      console.log(`[sendNotificationAsync] 사용자 ${config.userId}의 푸시 구독 정보 조회 시도`);
      const { data: subscriptionData, error: subscriptionError } = await adminClient
        .from('push_subscriptions')
        .select('endpoint, p256dh, auth')
        .eq('user_id', config.userId)
        .single();

      // 3. 알림 내역 저장용 데이터 (auction_id는 별도 필드로, data에서 제거)
      const notificationData = {
        user_id: config.userId,
        auction_id: config.auctionId, // 별도 필드로 저장
        title: config.title,
        body: config.body,
        type: config.type,
        data: {
          ...config.data,
          product_name: productName, // product_name만 data에 포함
        },
        sent_at: new Date().toISOString(),
      };

      if (subscriptionError || !subscriptionData) {
        console.warn(
          `[sendNotificationAsync] 사용자 ${config.userId}는 푸시 알림 구독 정보가 없거나 조회 실패. Error:`,
          subscriptionError
        );
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
        `[sendNotificationAsync] 사용자 ${config.userId}의 푸시 구독 정보 발견. Endpoint: ${subscriptionData.endpoint}`
      );

      // 4. 푸시 알림 전송
      try {
        const pushSubscription = {
          endpoint: subscriptionData.endpoint,
          keys: {
            p256dh: subscriptionData.p256dh,
            auth: subscriptionData.auth,
          },
        };

        const pushPayload = JSON.stringify({
          title: config.title,
          body: config.body,
          url: `/auction/${config.auctionId}/auction-detail`,
        });

        console.log(`[sendNotificationAsync] 푸시 알림 전송 시도 중... userId: ${config.userId}`);
        await webpush.sendNotification(pushSubscription, pushPayload);
        console.log(`[sendNotificationAsync] 푸시 알림 전송 성공! userId: ${config.userId}`);

        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: 'sent',
        });

        console.log(
          `[sendNotificationAsync] ${config.type} 알림 전송 성공 및 상태 기록: sent for userId: ${config.userId}`
        );
      } catch (pushError: any) {
        // pushError 타입을 any로 명시하여 statusCode 접근 용이
        console.error(`[sendNotificationAsync] 푸시 전송 실패 (${config.userId}):`, pushError);

        let deliveryStatus = 'failed';
        if (pushError.statusCode) {
          console.error(`[sendNotificationAsync] Push API Status Code: ${pushError.statusCode}`);
          if (pushError.statusCode === 410 || pushError.statusCode === 404) {
            console.warn(
              `[sendNotificationAsync] 구독 만료 또는 찾을 수 없음. DB에서 해당 구독 삭제 필요:`
            );
            // TODO: 여기에 DB에서 해당 pushSubscription을 삭제하는 로직을 추가해야 합니다.
            // 예: await adminClient.from('push_subscriptions').delete().eq('endpoint', pushSubscription.endpoint);
            deliveryStatus = 'expired_or_not_found'; // 새로운 상태 추가
          } else if (pushError.code === 'ECONNRESET') {
            console.error(
              `[sendNotificationAsync] ECONNRESET 발생. VAPID 키 또는 네트워크 문제 가능성. `
            );
            deliveryStatus = 'network_error'; // 새로운 상태 추가
          }
        }

        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: deliveryStatus, // 상세한 실패 상태 기록
        });

        console.error(
          `[sendNotificationAsync] 알림 상태 기록: ${deliveryStatus} for userId: ${config.userId}`
        );
      }
    } catch (error) {
      console.error('[sendNotificationAsync] 알림 처리 중 예상치 못한 오류:', error);
    }
  });
};
