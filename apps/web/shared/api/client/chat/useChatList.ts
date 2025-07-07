import { useQuery } from '@tanstack/react-query';

import { fetchChatRoomList } from '@/shared/api/server/chat/fetchChatRoomList';

export const useChatList = (userId: string) => {
  return useQuery({
    queryKey: ['chatrooms', userId],
    queryFn: () => fetchChatRoomList(userId),
    staleTime: 1000 * 60 * 1,
  });
};
