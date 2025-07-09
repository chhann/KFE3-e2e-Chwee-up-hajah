'use client';

import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import { useParams } from 'next/navigation';

import {
  AuctionDescriptionCard,
  AuctionDetailCard,
  AuctionSellerProfile,
} from '@/widgets/auction-detail-card';
import { ImageBanner } from '@/widgets/image-banner';

import { useAuctionBidState } from '@/features/auction-detail/model/useAuctionBidState';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';

const Page = () => {
  const params = useParams();
  const auctionId = params.auctionId as string;
  const {
    data,
    isLoading,
    error,
    displayBids,
    displayCurrentPrice,
    bidCost,
    minusBidCost,
    plusBidCost,
    sendBid,
    minBidCostNumber,
  } = useAuctionBidState(auctionId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const { product, seller } = data;
  const imageFiles = data.images || [];
  const auctionName = product.name;
  const startBidCost = data.start_price;
  const remainingTime = getTimeLeftString(data.end_time);
  const bidUnit = 5000; // 입찰 단위

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-2.5" role="main">
      <ImageBanner images={imageFiles} height={230} />
      <h1 className="text-neutral-70 mr-auto mt-5 font-semibold">{auctionName}</h1>
      <AuctionDetailCard
        currentBidCost={displayCurrentPrice}
        startBidCost={startBidCost}
        remainingTime={remainingTime}
        minBidCost={minBidCostNumber}
        bidUnit={bidUnit}
        bidCost={bidCost}
        isProgressing={data.status === 'in progress'}
        auctionId={auctionId}
        sellerId={data.seller_id}
        onMinus={minusBidCost}
        onPlus={plusBidCost}
        onClick={sendBid}
      />
      <AuctionSellerProfile user={seller} />
      <AuctionDescriptionCard bids={displayBids} description={product.description} />
      {data.status === 'end' && (
        <AuctionOverlay overlayText="경매가 종료되었습니다." isCanClose={true} />
      )}
    </main>
  );
};
export default Page;
