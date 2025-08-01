import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useAddPoint } from '@/shared/api/client/point/useAddPoint';
import { confirmTradeCompletion } from '@/shared/api/server/chat/confirmTradeCompletion';

export const useConfirmTradeCompletion = (roomId: string, currentUserId: string) => {
  const queryClient = useQueryClient();
  const { mutate: addPointMutate } = useAddPoint({ userId: currentUserId });

  return useMutation({
    mutationFn: () => confirmTradeCompletion(roomId),
    onSuccess: () => {
      toast.success('거래가 성공적으로 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['chatRoomHeader', roomId] });
      addPointMutate();
    },
    onError: (error) => {
      toast.error(error.message || '거래 확정에 실패했습니다.');
      console.error('[useConfirmTradeCompletion] error:', error);
    },
  });
};
