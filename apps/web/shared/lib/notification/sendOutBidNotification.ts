import { adminClient } from '@/app/admin';
import webpush from 'web-push';

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey!,
  vapidKeys.privateKey!
);

export const sendOutbidNotificationAsync = ({
  previousBidderId,
  auctionId,
  newBidAmount,
}: {
  previousBidderId: string;
  auctionId: string;
  newBidAmount: number;
}) => {
  setImmediate(async () => {
    try {
      const { data: auctionData, error: auctionError } = await adminClient
        .from('auction')
        .select(
          `
          auction_id,
          product:product_id (
            name
          )
        `
        )
        .eq('auction_id', auctionId)
        .single();

      if (auctionError || !auctionData) {
        console.error('경매 정보 조회 실패:', auctionError);
        return;
      }

      const productName = auctionData.product?.[0]?.name || '상품';

      // 구독 정보 조회
      const { data: subscriptionData, error: subscriptionError } = await adminClient
        .from('push_subscriptions')
        .select('endpoint, p256dh, auth')
        .eq('user_id', previousBidderId)
        .single();

      // 알림 내역 저장용 데이터
      const notificationData = {
        user_id: previousBidderId,
        title: '더 높은 입찰 등장!',
        body: `${productName} 경매에서 더 높은 입찰이 나타났습니다. 현재 최고가: ${newBidAmount.toLocaleString()}원`,
        type: 'auction_outbid',
        data: {
          auction_id: auctionId,
          bid_amount: newBidAmount, // 해당 시점의 입찰가
          product_name: productName, // 상품명도 저장 (상품명 변경 대비)
        },
        sent_at: new Date().toISOString(),
      };

      if (subscriptionError || !subscriptionData) {
        // 구독 정보 없음
        await adminClient.from('notifications').insert({
          ...notificationData,
          delivery_status: 'not_subscribed',
        });
        console.log(`사용자 ${previousBidderId}는 푸시 알림 구독하지 않음`);
        return;
      }

      // 푸시 알림 전송 시도
      try {
        const pushSubscription = {
          endpoint: subscriptionData.endpoint,
          keys: {
            p256dh: subscriptionData.p256dh,
            auth: subscriptionData.auth,
          },
        };

        const pushPayload = JSON.stringify({
          title: notificationData.title,
          body: notificationData.body,
          url: `/auction/${auctionId}/auction-detail`,
        });

        await webpush.sendNotification(pushSubscription, pushPayload);

        // 성공 시 알림 내역 저장
        await adminClient.from('notifications').insert({
          ...notificationData,
          delivery_status: 'sent',
        });

        console.log(`입찰 알림 전송 성공: ${previousBidderId}`);
      } catch (pushError) {
        // 푸시 실패 시에도 알림 내역 저장
        await adminClient.from('notifications').insert({
          ...notificationData,
          delivery_status: 'failed',
        });

        console.error(`푸시 전송 실패 (${previousBidderId}):`, pushError);
      }
    } catch (error) {
      console.error('알림 처리 중 오류:', error);
    }
  });
};
