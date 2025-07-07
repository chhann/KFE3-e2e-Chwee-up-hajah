import { useCallback } from 'react';

import { MutateOptions } from '@tanstack/react-query';

import { AuctionBidParams, AuctionBidResponse } from '@/hooks/useAuctionBid';
import { AuctionDetail } from '@/shared/types/db';

export function useSendBid(
  data: AuctionDetail | undefined,
  auctionId: string,
  bidderId: string | null,
  bidCost: number,
  mutate: (
    variables: AuctionBidParams,
    options?: MutateOptions<AuctionBidResponse, Error, AuctionBidParams, unknown> | undefined
  ) => void
) {
  return useCallback(() => {
    if (!data) {
      alert('경매 데이터가 없습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (data.status === 'ready') {
      alert('경매가 시작되지 않았습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (data.seller_id === bidderId) {
      alert('본인의 경매에는 입찰할 수 없습니다.');
      return;
    }
    if (!auctionId || !bidderId) {
      alert('경매 ID 또는 입찰자 ID가 없습니다.');
      return;
    }
    mutate({
      auctionId,
      bidderId,
      bidPrice: bidCost,
    });
  }, [data, auctionId, bidderId, bidCost, mutate]);
}
