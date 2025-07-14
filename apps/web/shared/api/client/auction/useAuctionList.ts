import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchAuctionList } from '../../server/auction/fetchAuctionList';

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
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';

  return useQuery<AuctionItem[], Object, AuctionItem[], [_1: string, string]>({
    queryKey: ['auction-list', search],
    queryFn: fetchAuctionList,
    staleTime: 1000 * 60 * 5,
  });
};
