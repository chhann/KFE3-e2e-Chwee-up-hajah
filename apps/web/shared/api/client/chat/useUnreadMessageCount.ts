import { useQuery } from '@tanstack/react-query';
import { fetchUnreadCountMap } from '@/shared/api/server/chat/fetchUnreadCountMap';

export const useUnreadCountMap = () => {
  return useQuery({
    queryKey: ['unreadCountMap'],
    queryFn: fetchUnreadCountMap,
    staleTime: 10_000, // 선택 사항
  });
};
