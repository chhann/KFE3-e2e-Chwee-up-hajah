import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteAuction } from '../../server/auction/deleteAuction';

export const useDeleteAuction = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (auctionId: string) => deleteAuction(auctionId),
    onSuccess: () => {
      router.push('/main');
    },
    onError: (error) => {
      alert('삭제 실패' + error.message);
    },
  });
};
