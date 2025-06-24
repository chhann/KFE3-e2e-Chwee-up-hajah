import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CreateAuctionPayload {
  name: string;
  category: string;
  description: string;
  start_price: number;
  start_time: string;
  end_time: string;
  thumbnail: string;
  images: string[];
}

export function useCreateAuction() {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreateAuctionPayload) =>
      fetch('/api/auction/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
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
      router.push('/');
    },
    onError: (error) => {
      alert('전송 실패');
    },
  });
}
