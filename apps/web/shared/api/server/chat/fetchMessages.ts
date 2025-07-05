import { MessageWithSender } from '@/shared/types/chat';

export const fetchMessages = async (roomId: string): Promise<MessageWithSender[]> => {
  const res = await fetch(`/api/chat/room?roomId=${roomId}`);
  if (!res.ok) throw new Error('메시지를 불러오는 데 실패했습니다');

  const data = await res.json();
  return data;
};
