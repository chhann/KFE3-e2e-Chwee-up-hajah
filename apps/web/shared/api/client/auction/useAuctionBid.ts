import { AuctionBidParams, AuctionBidResponse } from '@/shared/types/auction';
import { useMutation } from '@tanstack/react-query';
import { postAuctionBid } from '../../server/auction/postAuctionBid';

export function useAuctionBid() {
  return useMutation<AuctionBidResponse, Error, AuctionBidParams>({
    mutationFn: postAuctionBid,
    onSuccess: () => alert('입찰이 완료되었습니다.'),
    onError: (error) => {
      alert('입찰 실패: ' + error.message);
    },
  });
}
