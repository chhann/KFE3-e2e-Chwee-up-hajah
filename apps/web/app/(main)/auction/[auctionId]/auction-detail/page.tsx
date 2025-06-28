'use client';

import { useEffect, useRef, useState } from 'react';

import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import { useParams } from 'next/navigation';

import {
  AuctionDescriptionCard,
  AuctionDetailCard,
  AuctionSellerProfile,
} from '@/widgets/auction-detail-card';
import { ImageBanner } from '@/widgets/image-banner';

import { useAuctionBid } from '@/hooks/useAuctionBid';
import { useAuctionDetail } from '@/hooks/useAuctionDetail';
import { useRealtimeBids } from '@/hooks/useRealTimeBid';
import { useAuthStore } from '@/stores/auth';
import { Bid } from '@/types/db';

const Page = () => {
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

  // 표시될 데이터를 상태로 관리
  const [displayBids, setDisplayBids] = useState<Bid[]>([]);
  const [displayCurrentPrice, setDisplayCurrentPrice] = useState<number>(0);

  // 데이터 로드 시 상태 초기화
  useEffect(() => {
    if (data) {
      setDisplayBids(data.bids || []);
      setDisplayCurrentPrice(data.current_price ?? 0);
    }
  }, [data]);

  // 실시간 입찰 처리
  useRealtimeBids(auctionId, (newBid) => {
    // 입찰 내역 업데이트 (가장 최근 입찰이 위로)
    setDisplayBids((prevBids) => [newBid, ...prevBids]);
    // 현재가 업데이트
    if (newBid.bid_price) {
      setDisplayCurrentPrice(newBid.bid_price);
    }
  });

  const bidUnit = 5000;
  const minBidCostNumber = displayCurrentPrice + bidUnit;
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
  const { product, seller } = data;
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
        currentBidCost={displayCurrentPrice}
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
      <AuctionDescriptionCard bids={displayBids} description={product.description} />
    </main>
  );
};
export default Page;
