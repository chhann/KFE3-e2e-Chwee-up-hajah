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

export interface AuctionBase {
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
}
export interface ProductItem {
  name: string;
  category: string;
  description: string;
}
export interface AuctionItem extends AuctionBase {
  product: ProductItem;
  seller: {
    username: string;
    address: string;
  };
}

export interface UpdateAuctionParams {
  auctionId: string;
  auctionData: AuctionBase;
  productData: ProductItem;
}
