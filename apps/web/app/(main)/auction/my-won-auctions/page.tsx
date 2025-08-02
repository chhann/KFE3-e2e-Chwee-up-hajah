'use client';

import { LoadingSpinner } from '@/widgets/loading-spiner';
import { MyWonAuctions } from '@/widgets/my-won-auctions/ui/MyWonAuctions';

import { useMyWonAuctions } from '@/shared/api/client/auction/useMyWonAuctions';
import { mapAuctionItem } from '@/shared/lib/utils/mapAuctionItem';
import { useAuthStore } from '@/shared/stores/auth';

const Page = () => {
  const { userId } = useAuthStore();

  const { data: listings, isLoading, isError } = useMyWonAuctions(userId!);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div className="my-8 text-red-500">낙찰된 경매 목록을 불러오지 못했습니다.</div>;
  }

  const filteredList = (listings || []).map(mapAuctionItem);

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3">낙찰된 물품</h1>
      <MyWonAuctions listData={filteredList} />
    </main>
  );
};

export default Page;
