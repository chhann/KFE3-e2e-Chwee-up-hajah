import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { requestTradeCompletion } from '@/shared/api/server/chat/requestTradeCompletion';

export const useRequestTradeCompletion = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requestTradeCompletion(roomId),
    onSuccess: () => {
      toast.success('거래 완료를 요청했습니다.');
      // 채팅방 헤더 정보를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['chatRoomHeader', roomId] });
    },
    onError: (error) => {
      toast.error(error.message || '거래 완료 요청에 실패했습니다.');
      console.error('[useRequestTradeCompletion] error:', error);
    },
  });
};
