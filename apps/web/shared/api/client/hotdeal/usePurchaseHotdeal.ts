import { postPurchaseHotdeal } from '@/shared/api/server/hotdeal/postPurchaseHotdeal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePurchaseHotdeal = (hotdealId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPurchaseHotdeal,
    onSuccess: () => {
      alert('구매가 완료되었습니다.');
      // 구매 성공 시, 해당 핫딜의 상세 정보 쿼리를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({
        queryKey: ['hotdealDetail', hotdealId],
      });
    },
    onError: (error: Error) => {
      // 이제 error 객체는 표준 Error 객체입니다.
      alert(`구매 실패: ${error.message}`);
      console.error('Purchase failed:', error);
    },
  });
};
