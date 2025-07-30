import { useQuery } from '@tanstack/react-query';

import { HotDeal } from '@/shared/types/db';

import { fetchHotdealList } from '../../server/hotdeal/fetchHotdealList';

export const useHotdealList = () => {
  return useQuery<(HotDeal & { status: string })[]>({
    queryKey: ['hotDeals'],
    queryFn: fetchHotdealList,
  });
};
