import { useQuery } from '@tanstack/react-query';

import { fetchMessages } from '@/app/api/chat/room/fetchMessages';

export const useMessages = (roomId?: string) => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => fetchMessages(roomId as string),
    staleTime: 1000 * 10, // 캐싱 10초
    enabled: !!roomId,
  });
};
