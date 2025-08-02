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
): Promise<{ status: 'sent' | 'not_subscribed' | 'expired' | 'failed' | 'partial'; error?: any }> {
  const { data: subscriptions, error: subscriptionError } = await adminClient
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth, user_agent')
    .eq('user_id', userId)
    .eq('is_active', true); // 활성화된 구독만

  if (subscriptionError || !subscriptions || subscriptions.length === 0) {
    console.log(`사용자 ${userId}의 활성 구독 없음`);
    return {
      status: 'not_subscribed',
      error: subscriptionError,
    };
  }

  // 2. 모든 기기에 병렬 푸시 알림 발송
  const pushResults = await Promise.allSettled(
    subscriptions.map((subscription) =>
      webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        JSON.stringify(payload)
      )
    )
  );

  // 3. 결과 분석 및 에러 처리
  let successCount = 0;
  const expiredEndpoints: string[] = [];

  pushResults.forEach((result, idx) => {
    const subscription = subscriptions[idx]!;

    if (result.status === 'fulfilled') {
      successCount++;
      console.log(`✅ 푸시 발송 성공: ${subscription.endpoint.slice(-10)}...`);
    } else {
      const error = result.reason as any;
      console.error(`푸시 발송 실패: ${subscription.endpoint.slice(-10)}...`, error);

      // 구독 만료된 경우 비활성화 대상에 추가
      if (error.statusCode === 410 || error.statusCode === 404) {
        expiredEndpoints.push(subscription.endpoint);
      }
    }
  });

  // 4. 만료된 구독들 일괄 비활성화
  if (expiredEndpoints.length > 0) {
    await adminClient
      .from('push_subscriptions')
      .update({ is_active: false })
      .in('endpoint', expiredEndpoints);

    console.log(`${expiredEndpoints.length}개 만료 구독 비활성화 완료`);
  }

  // 5. 상태 결정
  const total = subscriptions.length;
  let status: 'sent' | 'partial' | 'failed';

  if (successCount === total) {
    status = 'sent'; // 모든 기기 성공
  } else if (successCount > 0) {
    status = 'partial'; // 일부 기기 성공
  } else {
    status = 'failed'; // 모든 기기 실패
  }

  console.log(`푸시 발송 완료 - 성공: ${successCount}/${total}, 상태: ${status}`);

  return {
    status,
  };
}
