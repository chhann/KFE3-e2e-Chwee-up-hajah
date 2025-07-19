'use client';

import { urlBase64ToUint8Array } from '../utils/urlBase64ToUint8Array';

export const registerPushSubscription = async (): Promise<PushSubscription | null> => {
  try {
    if (!('serviceWorker' in navigator)) {
      console.warn('❌ ServiceWorker 미지원 브라우저');
      return null;
    }

    const permission = await Notification.requestPermission();
    console.log('📌 알림 권한 상태:', permission);
    if (permission !== 'granted') {
      console.warn('❌ 알림 권한 거부됨');
      return null;
    }

    console.log('✅ step 1: ServiceWorker 등록 시도 중');
    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready; // 확실히 등록 완료될 때까지 대기

    console.log('✅ step 2: 기존 푸시 구독 확인 중');
    const existing = await registration.pushManager.getSubscription();

    const subscription =
      existing ??
      (await (async () => {
        console.log('✅ step 3: VAPID 키 준비');
        const vapidKey = process.env.VAPID_PUBLIC_KEY!;
        const convertedKey = urlBase64ToUint8Array(vapidKey);

        console.log('📡 step 4: 푸시 구독 생성 시도');
        return await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
      })());

    console.log('✅ 푸시 구독 객체 확보 완료:', subscription);

    return subscription;
  } catch (err) {
    console.error('❌ registerPushSubscription 실패:', err instanceof Error ? err.message : err);
    return null;
  }
};
