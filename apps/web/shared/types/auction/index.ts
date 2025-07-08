import { CardProps } from '@repo/ui/design-system/base-components/Card/index';

export interface AuctionBidParams {
  auctionId: string;
  bidderId: string;
  bidPrice: number;
}

export interface AuctionBidResponse {
  success?: boolean;
  error?: string;
}

export interface CreateAuctionPayload {
  name: string;
  category: string;
  description: string;
  start_price: number;
  start_time: string;
  end_time: string;
  thumbnail: string;
  images: string[];
}
export interface AuctionCardProps extends CardProps {
  badgeVariant?: 'best' | 'urgent' | null;
  bidStartPrice: number;
  bidCurrentPrice: number;
  bidCount: number;
  myBidPrice?: number; // 내 입찰가
  myWonPrice?: number; // 내 낙찰가
}

export type AuctionItem = {
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
  bid_price: number;
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
