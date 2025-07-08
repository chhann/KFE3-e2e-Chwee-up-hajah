import { useQuery } from '@tanstack/react-query';

import { AuctionDetail } from '../../../types/db';
import { fetchAuctionDetail } from '../../server/auction/fetchAuctionDetail';

// auction, product, seller, bids 모두 db 타입을 활용해 정의

export function useAuctionDetail(auctionId: string) {
  return useQuery<AuctionDetail, Error>({
    queryKey: ['auctionDetail', auctionId],
    queryFn: () => fetchAuctionDetail(auctionId),
    enabled: !!auctionId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
}
