'use client';

import { useMemo, useState } from 'react';

import { auctionMockData, mockBids } from '../../../mock/auction';
import { user } from '../../../mock/user';
import {
  AuctionDescriptionCard,
  AuctionDetailCard,
  AuctionSellerProfile,
} from '../../../widgets/auction-detail-card';
import { ImageBanner } from '../../../widgets/image-banner';

export const AuctionDetailPage = () => {
  // mock-image 폴더 내 이미지 파일명 배열 (실제 환경에서는 서버에서 파일 목록을 받아오거나, 정적 import 필요)
  const imageFiles = useMemo(() => ['images (1).jpg', 'images.jpg'], []);
  const { auctionName, currentBidCost, startBidCost, remainingTime, bidUnit } = auctionMockData;

  const minBidCostNumber = currentBidCost + bidUnit;
  const [bidCost, setBidCost] = useState(minBidCostNumber);

  const minusBidCost = () => {
    setBidCost((prev) => {
      const newCostNumber = prev - bidUnit;
      const minBidNumber = minBidCostNumber;
      const finalCost = newCostNumber < minBidNumber ? minBidNumber : newCostNumber;
      return finalCost;
    });
  };

  const plusBidCost = () => {
    setBidCost((prev) => prev + bidUnit);
  };
  return (
    <main className="flex w-full flex-col items-center justify-center gap-2.5" role="main">
      <ImageBanner images={imageFiles} height={230}/>
      <h1 className="text-neutral-70 mr-auto mt-5 font-semibold">{auctionName}</h1>
      <AuctionDetailCard
        currentBidCost={currentBidCost}
        startBidCost={startBidCost}
        remainingTime={remainingTime}
        minBidCost={minBidCostNumber}
        bidUnit={bidUnit}
        bidCost={bidCost}
        onMinus={minusBidCost}
        onPlus={plusBidCost}
      />
      <AuctionSellerProfile user={user} />
      <AuctionDescriptionCard bids={mockBids} />
    </main>
  );
};
