import webpush from 'web-push';
import { adminClient } from '@/app/admin';

// VAPID 키 설정 (기존 sendNotification.ts와 동일)
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:chwee.chwee.project@gmail.com', // 문의 이메일
  vapidKeys.publicKey!,
  vapidKeys.privateKey!
);

interface PushPayload {
  title: string;
  body: string;
  url?: string;
}

/**
 * 특정 사용자에게 푸시 알림을 비동기적으로 발송합니다.
 * @param userId 알림을 받을 사용자의 UUID
 * @param payload 알림에 포함될 내용 (title, body, url)
 * @returns Promise<PushResult>
 */
export async function sendPushNotification(
  userId: string,
  payload: PushPayload
): Promise<{ status: 'sent' | 'not_subscribed' | 'expired' | 'failed'; error?: any }> {
  // 1. 사용자의 푸시 구독 정보 조회
  const { data: subscription, error: subscriptionError } = await adminClient
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', userId)
    .eq('is_active', true) // 활성화된 구독만
    .single();

  if (subscriptionError || !subscription) {
    return { status: 'not_subscribed', error: subscriptionError };
  }

  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth,
    },
  };

  // 2. 푸시 알림 발송
  try {
    await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
    return { status: 'sent' };
  } catch (error: any) {
    console.error(`푸시 발송 실패 (User: ${userId}):`, error);

    // 구독 만료 또는 잘못된 구독 처리 (404, 410)
    if (error.statusCode === 410 || error.statusCode === 404) {
      // DB에서 만료된 구독 정보 비활성화 또는 삭제
      await adminClient
        .from('push_subscriptions')
        .update({ is_active: false })
        .eq('endpoint', subscription.endpoint);
      return { status: 'expired', error };
    }
    return { status: 'failed', error };
  }
}
