import { useQuery } from '@tanstack/react-query';

import { fetchChatRooms } from '../../../entities/chat/api/fetchChatRooms';

export const useChatRooms = (userId: string) => {
  return useQuery({
    queryKey: ['chatrooms', userId],
    queryFn: () => fetchChatRooms(userId),
    staleTime: 1000 * 60 * 1,
  });
};
