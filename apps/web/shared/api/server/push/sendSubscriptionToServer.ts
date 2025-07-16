export const sendSubscriptionToServer = async (subscription: PushSubscription) => {
  const { endpoint } = subscription;
  const { p256dh, auth } = subscription.toJSON().keys || {};

  if (!endpoint || !p256dh || !auth) {
    throw new Error('❌ 푸시 구독 정보 누락');
  }

  const response = await fetch('/api/push-subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint,
      keys: { p256dh, auth },
      user_agent: navigator.userAgent,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`❌ 서버 전송 실패: ${response.status} ${text}`);
  }

  return await response.json();
};
