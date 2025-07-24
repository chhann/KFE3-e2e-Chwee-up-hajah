import { HotDeal } from '@/shared/types/db';
import { useQuery } from '@tanstack/react-query';
import { fetchHotdealDetail } from '../../server/hotdeal/fetchHotdealDetail';

export function useHotdealDetailQuery(hotdealId: string) {
  return useQuery<HotDeal, Error>({
    queryKey: ['hotdealDetail', hotdealId],
    queryFn: () => fetchHotdealDetail(hotdealId),
    enabled: !!hotdealId,
    staleTime: 1000 * 60 * 5,
  });
}
