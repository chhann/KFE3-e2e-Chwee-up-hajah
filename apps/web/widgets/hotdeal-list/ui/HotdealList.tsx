'use client';

import { useHotdealList } from '@/shared/api/client/hotdeal/useHotdealList';

import { HotdealListings } from './HotdealListings';

export const HotdealList = () => {
  const { data: hotdealList, isLoading } = useHotdealList();

  const activeHotdeals = hotdealList?.filter((deal) => deal.is_active) || [];

  return <HotdealListings listData={activeHotdeals} isLoading={isLoading} />;
};
