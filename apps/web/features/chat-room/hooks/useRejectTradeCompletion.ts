import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { rejectTradeCompletion } from '@/shared/api/server/chat/rejectTradeCompletion';

export const useRejectTradeCompletion = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => rejectTradeCompletion(roomId),
    onSuccess: () => {
      toast.success('거래 완료 요청을 거절했습니다.');
      queryClient.invalidateQueries({ queryKey: ['chatRoomHeader', roomId] });
    },
    onError: (error) => {
      toast.error(error.message || '요청 거절에 실패했습니다.');
      console.error('[useRejectTradeCompletion] error:', error);
    },
  });
};
