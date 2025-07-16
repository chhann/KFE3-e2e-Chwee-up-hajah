import { useMutation } from '@tanstack/react-query';
import { sendSubscriptionToServer } from '../../server/push/sendSubscriptionToServer';

export const usePushSubscription = () => {
  return useMutation({
    mutationFn: sendSubscriptionToServer,

    onSuccess: () => {
      console.log('📬 푸시 구독 정보 서버 전송 성공');
    },

    onError: (error) => {
      console.error('❌ 푸시 구독 정보 서버 전송 실패:', error);
    },
  });
};
