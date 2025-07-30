'use client';

import { LoadingSpinner } from '@/widgets/loading-spiner';

import { useHotdealList } from '@/shared/api/client/hotdeal/useHotdealList';

import { HotdealListings } from './HotdealListings';

export const HotdealList = () => {
  const { data: hotdealList, isLoading } = useHotdealList();

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const activeHotdeals = hotdealList?.filter((deal) => deal.is_active) || [];

  return <HotdealListings listData={activeHotdeals} />;
};
