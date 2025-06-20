'use client';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import { MdLocationPin } from 'react-icons/md';

import { categories, mockListings } from '../../../mock/auction';
import { AuctionListings } from '../../../widgets/auction-listings';

export const AuctionListPage = () => {
  const locationName = '서울시 강남구';
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-1">
      <div className="mr-auto flex items-center gap-1">
        <MdLocationPin className="text-[var(--color-red-500)]" />
        <div className="text-neutral-70">{locationName}</div>
      </div>
      <Category categories={categories} />
      <select
        name="listFilter"
        id="actionListFilter"
        className="text-neutral-70 my-2 ml-auto mr-4 w-1/2 rounded-sm p-1 shadow-md"
      >
        <option value="all" selected>
          전체 보기
        </option>
        <option value="best">인기</option>
        <option value="urgent">마감순</option>
      </select>
      <AuctionListings listData={mockListings} />
    </main>
  );
};
