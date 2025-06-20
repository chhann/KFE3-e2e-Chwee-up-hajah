'use client';
import { useState } from 'react';

import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const AuctionAddPage = () => {
  const [auctionName, setAuctionName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [auctionCategory, setAuctionCategory] = useState('');

  const categoryOptions = [
    '의류',
    '가전',
    '취미',
    '도서',
    '가공식품',
    '가구/인테리어',
    '생활/주방',
  ];

  return (
    <div>
      <div className="w-30 h-30 border-neutral-40 mb-2 flex items-center justify-center rounded-md border">
        <IoIosAddCircleOutline className="text-neutral-40" />
      </div>
      <LocationInfo locationName="서울시 강남구" />
      <section className="mt-4 flex w-full max-w-md flex-col gap-4">
        <Input
          label="경매 이름"
          value={auctionName}
          onChange={(e) => setAuctionName(e.target.value)}
        />
        <Select
          label="경매 카테고리"
          value={auctionCategory}
          onChange={(e) => setAuctionCategory(e.target.value)}
          options={categoryOptions}
          id="auctionCategory"
        />
        <Input label="시작가" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} />
      </section>
    </div>
  );
};
