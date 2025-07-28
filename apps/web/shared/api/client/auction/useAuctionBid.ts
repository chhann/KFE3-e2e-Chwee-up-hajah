import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuctionBidParams, AuctionBidResponse } from '@/shared/types/auction';

import { postAuctionBid } from '../../server/auction/postAuctionBid';

export function useAuctionBid() {
  const queryClient = useQueryClient();
  return useMutation<AuctionBidResponse, Error, AuctionBidParams>({
    mutationFn: postAuctionBid,
    onSuccess: (data, variables) => {
      // 1. 경매 상세 정보 쿼리를 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: ['auctionDetail', variables.auctionId],
      });
      // 2. 내가 참여한 경매 목록 쿼리를 무효화합니다.
      queryClient.invalidateQueries({
        queryKey: [variables.bidderId, 'auctions', 'my-participated'],
      });

      alert('입찰이 완료되었습니다.');
    },
    onError: (error) => {
      alert('입찰 실패: ' + error.message);
    },
  });
}
