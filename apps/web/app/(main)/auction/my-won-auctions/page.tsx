'use client';

import { useMyWonAuctions } from '@/shared/api/client/auction/useMyWonAuctions';
import { mapAuctionItem } from '@/shared/lib/utils/mapAuctionItem';
import { useAuthStore } from '@/shared/stores/auth';
import { MyWonAuctions } from '@/widgets/my-won-auctions/ui/MyWonAuctions';

const Page = () => {
  const { userId } = useAuthStore();

  const { data: listings, isLoading, isError } = useMyWonAuctions(userId!);

  if (isLoading) {
    return <div>낙찰된 경매 목록 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="my-8 text-red-500">낙찰된 경매 목록을 불러오지 못했습니다.</div>;
  }

  const filteredList = (listings || []).map(mapAuctionItem);

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">낙찰된 물품</h1>
      <MyWonAuctions listData={filteredList} />
    </main>
  );
};

export default Page;
