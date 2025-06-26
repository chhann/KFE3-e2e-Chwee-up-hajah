import { useQuery } from '@tanstack/react-query';

type AuctionItem = {
  auction_id: string;
  start_price: number;
  current_price: number;
  start_time: string;
  end_time: string;
  thumbnail: string;
  images: string[];
  seller_confirm: boolean;
  buyer_confirm: boolean;
  bid_count: number;
  status: string;
  badge_variant: 'urgent' | 'best' | null;
  product: {
    name: string;
    category: string;
    description: string;
  };
  seller: {
    username: string;
    address: string;
  };
};

export const useAuctionList = () => {
  return useQuery<AuctionItem[]>({
    queryKey: ['auction-list'],
    queryFn: async () => {
      const res = await fetch('/api/auction/list');
      if (!res.ok) throw new Error('경매 목록을 불러오지 못했습니다');
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
