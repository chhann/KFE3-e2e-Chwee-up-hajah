'use client';

import { useEffect, useState } from 'react';

import { usePushSubscription } from '@/shared/api/client/push/usePushSubscription';
import { usePushUnsubscription } from '@/shared/api/client/push/usePushUnsubscription';
import { registerPushSubscription } from '@/shared/lib/push/registerPushSubscription';

export const NotificationSettings = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: subscribeAsync } = usePushSubscription();
  const { mutateAsync: unsubscribeAsync } = usePushUnsubscription();

  useEffect(() => {
    if (!('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window)) {
      return;
    }

    setPermission(Notification.permission);
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('구독 상태 확인 중 오류:', error);
    }
  };

  const subscribeToNotifications = async () => {
    setIsLoading(true);
    try {
      const subscription = await registerPushSubscription();

      if (subscription) {
        await subscribeAsync(subscription);
        setIsSubscribed(true);
        setPermission('granted');
      }
    } catch (error) {
      console.error('❌ 알림 구독 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // 1. 브라우저에서 구독 해제
        await subscription.unsubscribe();

        // 2. 서버에 구독 해제 상태 업데이트
        await unsubscribeAsync(subscription.endpoint);

        setIsSubscribed(false);
      }
    } catch (error) {
      console.error('❌ 알림 구독 해제 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNotifications = () => {
    if (isLoading) return;

    if (isSubscribed) {
      unsubscribeFromNotifications();
    } else {
      subscribeToNotifications();
    }
  };

  if (!('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window)) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-end text-sm">
      <span className="mr-1">알림 허용</span>
      {permission !== 'denied' && (
        <button
          onClick={handleToggleNotifications}
          disabled={isLoading}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${isSubscribed ? 'bg-primary-500' : 'bg-neutral-300'} ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
          aria-label={isSubscribed ? '알림 끄기' : '알림 받기'}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${isSubscribed ? 'translate-x-6' : 'translate-x-1'} `}
          />
        </button>
      )}

      {permission === 'denied' && (
        <span className="text-xs text-neutral-50">브라우저 알림 설정을 변경해주세요.</span>
      )}
    </div>
  );
};
