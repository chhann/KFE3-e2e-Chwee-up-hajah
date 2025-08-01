import { useQuery } from '@tanstack/react-query';

import { fetchChatRoomHeader } from '@/shared/api/server/chat/fetchChatRoomHeader';

export const useChatRoomHeader = (roomId: string) => {
  return useQuery({
    queryKey: ['chatRoomHeader', roomId],
    queryFn: () => fetchChatRoomHeader(roomId),
    enabled: !!roomId, // roomId가 있을 때만 쿼리 실행
  });
};
