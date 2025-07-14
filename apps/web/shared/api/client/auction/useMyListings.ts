import { AuctionItem } from '@/shared/types/auction';
import { useQuery } from '@tanstack/react-query';

export const useMyListings = (userId: string, filter: string) => {
  return useQuery<AuctionItem[]>({
    queryKey: [userId, 'auctions', 'my-listings', filter],
    queryFn: async () => {
      const res = await fetch(`/api/auction/my-listings/${filter}?userId=${userId}`);
      if (!res.ok) throw new Error('내 판매 물품 내역을 불러오지 못했습니다.');
      return res.json();
    },
    enabled: !!userId,
  });
};
