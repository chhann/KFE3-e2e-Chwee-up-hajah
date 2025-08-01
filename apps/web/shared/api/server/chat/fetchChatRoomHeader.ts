import { ChatRoomHeaderProps } from '@/shared/types/chat';

export const fetchChatRoomHeader = async (roomId: string): Promise<ChatRoomHeaderProps> => {
  const res = await fetch(`/api/chat/room-header?roomId=${roomId}`, {
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('[fetchChatRoomHeader] error:', data.error);
    throw new Error('채팅방 헤더 정보를 불러오는 데 실패했습니다.');
  }

  return data;
};
