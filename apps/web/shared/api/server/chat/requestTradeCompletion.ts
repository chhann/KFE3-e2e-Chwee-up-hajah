import { ChatRoomHeaderProps } from '@/shared/types/chat';

export const requestTradeCompletion = async (roomId: string): Promise<ChatRoomHeaderProps> => {
  const res = await fetch('/api/chat/request-completion', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomId }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[requestTradeCompletion] error:', data.error);
    throw new Error('거래 완료 요청에 실패했습니다.');
  }

  return data;
};
