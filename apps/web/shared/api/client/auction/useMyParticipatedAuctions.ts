import { AuctionItem } from '@/shared/types/auction';
import { useQuery } from '@tanstack/react-query';

export const useMyParticipatedAuction = (userId: string) => {
  return useQuery<AuctionItem[]>({
    queryKey: [userId, 'auctions', 'my-participated'],
    queryFn: async () => {
      const res = await fetch(`/api/auction/my-participated?userId=${userId}`);
      if (!res.ok) throw new Error('내가 참여한 경매 목록을 불러오지 못했습니다.');
      return res.json();
    },
    enabled: !!userId,
  });
};
