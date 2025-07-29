import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { postPurchaseHotdeal } from '@/shared/api/server/hotdeal/postPurchaseHotdeal';

export const usePurchaseHotdeal = (hotdealId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPurchaseHotdeal,
    onSuccess: () => {
      toast.success('구매가 완료되었습니다.');
      // 구매 성공 시, 해당 핫딜의 상세 정보 쿼리를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({
        queryKey: ['hotdealDetail', hotdealId],
      });
    },
    onError: (error: Error) => {
      // 이제 error 객체는 표준 Error 객체입니다.
      toast.error(`구매 실패: ${error.message}`);
      console.log('Purchase failed:', error);
    },
  });
};
