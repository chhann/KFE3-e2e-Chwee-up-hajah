'use client';

import { urlBase64ToUint8Array } from '../utils/urlBase64ToUint8Array';

export const registerPushSubscription = async (): Promise<PushSubscription | null> => {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.warn('개발 환경에서는 푸시 구독을 등록하지 않습니다.');
      return null;
    }
    // C + S + R 누르기 귀찮으시면 개발환경때 주석 해제해서 사용해 주시면 됩니다 !

    if (!('serviceWorker' in navigator)) {
      console.warn('❌ ServiceWorker 미지원 브라우저');
      return null;
    }
    // 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('❌ 알림 권한 거부됨');
      return null;
    }

    // ServiceWorker 등록 및 대기
    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    // 기존 구독 확인
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      console.log('✅ 기존 구독 사용');
      return existingSubscription;
    }

    // 새 구독 생성
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
    const applicationServerKey = urlBase64ToUint8Array(vapidKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });

    console.log('✅ 새 푸시 구독 생성 완료');
    return subscription;
  } catch (error) {
    console.error('❌ registerPushSubscription 실패:', error);
    return null;
  }
};
