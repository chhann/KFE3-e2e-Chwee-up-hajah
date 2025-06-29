import { useQuery } from '@tanstack/react-query';

import { fetchChatRooms } from '../../../app/api/chat/list/fetchChatRooms';

export const useChatRooms = (userId?: string) => {
  return useQuery({
    queryKey: ['chatrooms', userId],
    queryFn: () => fetchChatRooms(userId as string),
    staleTime: 1000 * 60 * 1,
    enabled: !!userId,
  });
};
