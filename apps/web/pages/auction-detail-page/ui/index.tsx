'use client';

import { useEffect, useRef, useState } from 'react';

import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import { useParams } from 'next/navigation';

import { useAuctionBid } from '../../../hooks/useAuctionBid';
import { useAuctionDetail } from '../../../hooks/useAuctionDetail';
import { useAuthStore } from '../../../stores/auth';
import {
  AuctionDescriptionCard,
  AuctionDetailCard,
  AuctionSellerProfile,
} from '../../../widgets/auction-detail-card';
import { ImageBanner } from '../../../widgets/image-banner';

export const AuctionDetailPage = () => {
  const params = useParams();
  const auctionId =
    typeof params?.auctionId === 'string'
      ? params.auctionId
      : Array.isArray(params?.auctionId)
        ? params.auctionId[0]
        : undefined;
  const { data, isLoading, error } = useAuctionDetail(auctionId ?? '');
  const { mutate } = useAuctionBid();
  const bidderId = useAuthStore((state) => state.userId);

  const bidUnit = 5000;
  const currentBidCost = data?.current_price ?? 0;
  const minBidCostNumber = currentBidCost + bidUnit;
  const [bidCost, setBidCost] = useState(minBidCostNumber);
  const [isUserChanged, setIsUserChanged] = useState(false);
  const prevMinBidCostNumber = useRef(minBidCostNumber);

  // 실시간 입찰가가 바뀌었을 때, 사용자가 조작 중이 아니면 자동 초기화
  useEffect(() => {
    if (!isUserChanged) {
      setBidCost(minBidCostNumber);
    } else if (bidCost < minBidCostNumber) {
      setBidCost(minBidCostNumber);
    }
    prevMinBidCostNumber.current = minBidCostNumber;
    // eslint-disable-next-line
  }, [minBidCostNumber]);

  // 로딩/에러 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  // AuctionDetail 타입에 맞게 데이터 추출
  const { product, seller, bids } = data;
  const imageFiles = data.images || [];
  const auctionName = product.name;
  const startBidCost = data.start_price;
  const remainingTime = getTimeLeftString(data.end_time);

  const minusBidCost = () => {
    setIsUserChanged(true);
    setBidCost((prev: number) => {
      const newCostNumber = prev - bidUnit;
      const minBidNumber = minBidCostNumber;
      const finalCost = newCostNumber < minBidNumber ? minBidNumber : newCostNumber;
      return finalCost;
    });
  };

  const plusBidCost = () => {
    setIsUserChanged(true);
    setBidCost((prev: number) => prev + bidUnit);
  };

  const sendBid = () => {
    if (data.seller_id === bidderId) {
      return alert('본인의 경매에는 입찰할 수 없습니다.');
    }
    if (!auctionId || !bidderId) {
      return alert('경매 ID 또는 입찰자 ID가 없습니다.');
    }
    mutate({
      auctionId,
      bidderId,
      bidPrice: bidCost,
    });
  };

  return (
    <main className="flex w-full flex-col items-center justify-center gap-2.5" role="main">
      <ImageBanner images={imageFiles} height={230} />
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
        onClick={sendBid}
      />
      <AuctionSellerProfile user={seller} />
      <AuctionDescriptionCard bids={bids} description={product.description} />
    </main>
  );
};
