import { useMutation } from '@tanstack/react-query';

export interface AuctionBidParams {
  auctionId: string;
  bidderId: string;
  bidPrice: number;
}

export interface AuctionBidResponse {
  success?: boolean;
  error?: string;
}

async function auctionBid({
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

export function useAuctionBid() {
  return useMutation<AuctionBidResponse, Error, AuctionBidParams>({
    mutationFn: auctionBid,
    onSuccess: () => alert('입찰이 완료되었습니다.'),
    onError: (error) => {
      alert('입찰 실패: ' + error.message);
    },
  });
}
