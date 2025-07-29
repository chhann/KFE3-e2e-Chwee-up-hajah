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
  const data = await res.json();
  if (!res.ok) {
    // 서버에서 받은 에러 메시지를 throw
    throw new Error(data?.error || '입찰 요청 실패');
  }
  return data;
}
