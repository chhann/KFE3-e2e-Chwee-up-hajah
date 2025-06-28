'use client';

import { useState } from 'react';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';

import { AuctionListings } from '@/widgets/auction-listings';

import { useAuctionList } from '@/hooks/useAuctionList';
import { categories } from '@/mock/auction';

const Page = () => {
  const locationName = '서울시 강남구';
  const { data: auctionList, isLoading, isError } = useAuctionList();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  // API 데이터 → AuctionListings용 데이터로 변환
  const mappedList = (auctionList || []).map((item) => ({
    id: item.auction_id,
    bidStartPrice: item.start_price,
    bidCurrentPrice: item.current_price,
    bidCount: item.bid_count,
    status: item.status,
    imageSrc: item.thumbnail,
    title: item.product.name,
    category: item.product.category,
    description: item.product.description,
    badgeVariant: item.badge_variant,
    seller: {
      username: item.seller.username,
      address: item.seller.address,
    },
    locationName: item.seller.address,
    startTime: item.start_time,
    endTime: item.end_time,
  }));

  let filteredList = mappedList;
  if (!(selectedCategory === 'all' || selectedCategory === '전체')) {
    filteredList = filteredList.filter((item) => item.category === selectedCategory);
  }
  if (selectedBadge !== 'all') {
    filteredList = filteredList.filter((item) => item.badgeVariant === selectedBadge);
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-1">
      <div className="mr-auto flex items-center gap-1">
        <LocationInfo address={locationName}></LocationInfo>
      </div>
      <Category
        categories={categories}
        onCategoryClick={(cat) => setSelectedCategory(cat === '전체' ? 'all' : cat)}
      />
      <select
        name="listFilter"
        id="actionListFilter"
        className="text-neutral-70 my-2 ml-auto mr-4 w-1/2 rounded-sm p-1 shadow-md"
        value={selectedBadge}
        onChange={(e) => setSelectedBadge(e.target.value)}
      >
        <option value="all">전체 보기</option>
        <option value="best">인기</option>
        <option value="urgent">마감 임박</option>
      </select>
      {isLoading ? (
        <div className="my-8">경매 목록을 불러오는 중...</div>
      ) : isError ? (
        <div className="my-8 text-red-500">경매 목록을 불러오지 못했습니다.</div>
      ) : (
        <AuctionListings listData={filteredList} />
      )}
    </main>
  );
};

export default Page;
