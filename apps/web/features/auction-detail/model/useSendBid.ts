import { useCallback } from 'react';

import { MutateOptions } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { AuctionBidParams, AuctionBidResponse } from '@/shared/types/auction';
import { AuctionDetail, Bid } from '@/shared/types/db';

export function useSendBid(
  data: AuctionDetail | undefined,
  auctionId: string,
  bidderId: string | null,
  bidCost: number,
  displayBids: Bid[],
  mutate: (
    variables: AuctionBidParams,
    options?: MutateOptions<AuctionBidResponse, Error, AuctionBidParams, unknown> | undefined
  ) => void
) {
  return useCallback(() => {
    if (!data) {
      toast.error('경매 데이터가 없습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (data.status === 'ready') {
      toast.error('경매가 시작되지 않았습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (data.seller_id === bidderId) {
      toast.error('본인의 경매에는 입찰할 수 없습니다.');
      return;
    }
    if (!auctionId || !bidderId) {
      toast.error('경매 ID 또는 입찰자 ID가 없습니다.');
      return;
    }
    const lastBid = displayBids[displayBids.length - 1];
    if (lastBid && lastBid.bidder_id === bidderId) {
      toast.error('이미 최고가 입찰자입니다. 중복 입찰이 불가합니다.');
      return;
    }
    mutate({
      auctionId,
      bidderId,
      bidPrice: bidCost,
    });
  }, [data, auctionId, bidderId, bidCost, displayBids, mutate]);
}
