import { ChatRoomList } from '@/shared/types/chat';

export const fetchChatRoomList = async (userId: string): Promise<ChatRoomList[]> => {
  const res = await fetch(`/api/chat/list?userId=${userId}`, {
    cache: 'no-store', // 정적 캐시 (static cache)를 시도할 수 있어서, 채팅방 목록처럼 자주 바뀌는 데이터는 'no-store'로 설정
  });

  const data = await res.json(); // 한 번만 파싱

  if (!res.ok) {
    console.error('[fetchChatRoomList] error:', data.error);
    throw new Error('채팅방 목록을 불러오는 데 실패했습니다.');
  }

  return data;
};
