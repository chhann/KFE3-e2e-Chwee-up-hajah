import { ChatRoom } from '@/shared/types/chat';

export const fetchChatRoomList = async (userId: string): Promise<ChatRoom[]> => {
  const res = await fetch(`/api/chat/list?userId=${userId}`);
  if (!res.ok) throw new Error('채팅방 목록을 불러오는 데 실패했습니다.');

  const data = await res.json();
  return data;
};
