import { ChatRoomHeaderProps } from '@/shared/types/chat';

export const rejectTradeCompletion = async (roomId: string): Promise<ChatRoomHeaderProps> => {
  const res = await fetch('/api/chat/reject-completion', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[rejectTradeCompletion] error:', data.error);
    throw new Error('거래 완료 요청 거절에 실패했습니다.');
  }

  return data;
};
