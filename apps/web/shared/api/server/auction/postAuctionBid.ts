import { AuctionBidParams, AuctionBidResponse } from '@/shared/types/auction';

export async function postAuctionBid({
  auctionId,
  bidderId,
  bidPrice,
}: AuctionBidParams): Promise<AuctionBidResponse> {
  const res = await fetch('/api/auction/bid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auctionId, bidderId, bidPrice }),
  });
  return res.json();
}
