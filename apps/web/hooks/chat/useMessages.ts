import { useQuery } from '@tanstack/react-query';

import { fetchMessages } from '@/features/chat-room/model/fetchMessages';

export const useMessages = (roomId: string) => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => fetchMessages(roomId),
    staleTime: 1000 * 10, // 캐싱 10초
  });
};
