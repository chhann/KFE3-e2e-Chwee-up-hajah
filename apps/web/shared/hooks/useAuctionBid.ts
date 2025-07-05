import { useMutation } from '@tanstack/react-query';
import { postAuctionBid } from '../api/server/auction/postAuctionBid';
import { AuctionBidParams, AuctionBidResponse } from '../types/auction';

export function useAuctionBid() {
  return useMutation<AuctionBidResponse, Error, AuctionBidParams>({
    mutationFn: postAuctionBid,
    onSuccess: () => alert('입찰이 완료되었습니다.'),
    onError: (error) => {
      alert('입찰 실패: ' + error.message);
    },
  });
}
