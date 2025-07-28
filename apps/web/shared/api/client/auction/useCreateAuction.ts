import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { CreateAuctionPayload } from '@/shared/types/auction';

import { postAuctionAdd } from '../../server/auction/postAuctionAdd';

export function useCreateAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreateAuctionPayload) => postAuctionAdd(payload),
    onSuccess: async (res: Response, variables) => {
      if (!res.ok) {
        let errJson;
        try {
          errJson = await res.json();
        } catch {
          errJson = {};
        }
        alert('서버 오류: ' + (errJson.error || ''));
        return;
      }
      // 1. 전체 경매 목록 쿼리도 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['auction-list'] });

      // 2. '내가 등록한 경매 목록' 관련 쿼리를 모두 무효화합니다.
      if (variables.seller_id) {
        queryClient.invalidateQueries({
          queryKey: [variables.seller_id, 'auctions', 'my-listings'],
        });
      }
      // 성공 시 루트 페이지로 이동
      router.push('/main');
    },
    onError: (error) => {
      alert('전송 실패' + error.message);
    },
  });
}
