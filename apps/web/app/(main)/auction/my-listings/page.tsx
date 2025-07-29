'use client';

import { useState } from 'react';

import { MyListings } from '@/widgets/my-listings/ui/MyListings';

import { useMyListings } from '@/shared/api/client/auction/useMyListings';
import { mapAuctionItem } from '@/shared/lib/utils/mapAuctionItem';
import { useAuthStore } from '@/shared/stores/auth';

const Page = () => {
  const [filter, setFilter] = useState('in-progress');
  const { userId } = useAuthStore();

  const { data: listings, isLoading, isError } = useMyListings(userId!, filter);

  if (isLoading) {
    return <div>판매 물품 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="my-8 text-red-500">내 판매 물품을 불러오지 못했습니다.</div>;
  }

  const filteredList = (listings || []).map(mapAuctionItem);

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3">판매중인 물품</h1>
      <div className="w-full text-right">
        <select
          name="listFilter"
          id="actionListFilter"
          className="text-neutral-70 my-2 ml-auto w-1/2 rounded-sm p-1 shadow-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="in-progress">판매중</option>
          <option value="closed">종료</option>
        </select>
      </div>
      <MyListings listData={filteredList} />
    </main>
  );
};

export default Page;
