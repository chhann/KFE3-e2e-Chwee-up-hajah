import { ChatRoomHeaderProps } from '@/shared/types/chat';

export const confirmTradeCompletion = async (roomId: string): Promise<ChatRoomHeaderProps> => {
  const res = await fetch('/api/chat/confirm-completion', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[confirmTradeCompletion] error:', data.error);
    throw new Error('거래 확정에 실패했습니다.');
  }

  return data;
};
