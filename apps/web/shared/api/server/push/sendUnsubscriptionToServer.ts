export const sendUnsubscriptionToServer = async (endpoint: string) => {
  const response = await fetch('/api/push-unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint,
      user_agent: navigator.userAgent,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`❌ 구독 해제 실패: ${response.status} ${text}`);
  }

  return await response.json();
};
