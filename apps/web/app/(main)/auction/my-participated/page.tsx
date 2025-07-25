'use client';

import { useMyParticipatedAuction } from '@/shared/api/client/auction/useMyParticipatedAuctions';
import { mapAuctionItem } from '@/shared/lib/utils/mapAuctionItem';
import { useAuthStore } from '@/shared/stores/auth';
import { MyParticipatedAuctions } from '@/widgets/my-participated/ui/MyParticipatedAuctions';

const Page = () => {
  const { userId } = useAuthStore();

  const { data: listings, isLoading, isError } = useMyParticipatedAuction(userId!);

  if (isLoading) {
    return <div>참여 경매 목록 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="my-8 text-red-500">내 참여 경매 목록을 불러오지 못했습니다.</div>;
  }

  const filteredList = (listings || []).map(mapAuctionItem);

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">참여중인 경매</h1>
      <MyParticipatedAuctions listData={filteredList} />
    </main>
  );
};

export default Page;
