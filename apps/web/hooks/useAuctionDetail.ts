import { useQuery } from '@tanstack/react-query';

import { AuctionDetail } from '../types/db';

// auction, product, seller, bids 모두 db 타입을 활용해 정의

async function fetchAuctionDetail(auctionId: string): Promise<AuctionDetail> {
  const res = await fetch(`/api/auction/detail/${auctionId}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch auction detail');
  }
  const { data } = await res.json();
  return data;
}
export function useAuctionDetail(auctionId: string) {
  return useQuery<AuctionDetail, Error>({
    queryKey: ['auctionDetail', auctionId],
    queryFn: () => fetchAuctionDetail(auctionId),
    enabled: !!auctionId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
}
