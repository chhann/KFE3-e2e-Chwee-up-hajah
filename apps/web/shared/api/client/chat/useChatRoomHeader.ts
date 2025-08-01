import { useQuery } from '@tanstack/react-query';

import { fetchChatRoomHeader } from '../../server/chat/fetchChatRoomHeader';

export const useChatRoomHeader = (userId: string) => {
  return useQuery({
    queryKey: ['chatrooms', userId],
    queryFn: () => fetchChatRoomHeader(userId),
    staleTime: 1000 * 60 * 1,
  });
};
