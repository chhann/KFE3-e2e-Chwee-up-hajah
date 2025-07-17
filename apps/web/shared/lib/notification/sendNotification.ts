import { adminClient } from '@/app/admin';
import { AuctionWithProduct } from '@/shared/types/db';
import webpush from 'web-push';

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
        console.error('경매 정보 조회 실패:', auctionError);
        return;
      }

      const productName = auctionData.product.name;

      // 2. 구독 정보 조회
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
        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: 'not_subscribed',
        });
        console.log(`사용자 ${config.userId}는 푸시 알림 구독하지 않음`);
        return;
      }

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

        await webpush.sendNotification(pushSubscription, pushPayload);

        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: 'sent',
        });

        console.log(`${config.type} 알림 전송 성공: ${config.userId}`);
      } catch (pushError) {
        await adminClient.from('notification').insert({
          ...notificationData,
          delivery_status: 'failed',
        });

        console.error(`푸시 전송 실패 (${config.userId}):`, pushError);
      }
    } catch (error) {
      console.error('알림 처리 중 오류:', error);
    }
  });
};
