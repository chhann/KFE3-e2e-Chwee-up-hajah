import { CreateAuctionPayload } from '@/shared/types/auction';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postAuctionAdd } from '../../server/auction/postAuctionAdd';

export function useCreateAuction() {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreateAuctionPayload) => postAuctionAdd(payload),
    onSuccess: async (res: Response) => {
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
      // 성공 시 루트 페이지로 이동
      router.push('/main');
    },
    onError: (error) => {
      alert('전송 실패' + error.message);
    },
  });
}
