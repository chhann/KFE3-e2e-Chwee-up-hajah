export type Bid = {
  bid_id: string;
  auction_id: string;
  bidder_id: string;
  user?: { username: string };
  bid_price: number;
  bid_time: string;
};

export type AuctionDetail = {
  auction_id: string;
  product_id: string;
  seller_id: string;
  start_time: string;
  end_time: string;
  start_price: number;
  current_price: number;
  bid_count: number;
  status: string;
  seller_confirm: boolean;
  buyer_confirm: boolean;
  thumbnail: string;
  images: string[];
  created_at: string | null;
  badge_variant: 'urgent' | 'best' | null;
  // API 응답에 포함되는 연관 필드
  product: {
    name: string;
    category: string;
    created_at: string;
    product_id: string;
    description: string;
  };
  seller: {
    address: string;
    username: string;
    avatar: string;
    score: number;
    selling_auction: string[] | null;
  };
  bids: Bid[];
};

export type User = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  score: number;
  sold_auction: string[] | null;
  selling_auction: string[] | null;
  bought_auction: string[] | null;
  buying_auction: string[] | null;
  avatar: string;
  address: string;
  address_detail: string;
};

export type Product = {
  product_id: string;
  name: string;
  description: string;
  created_at: string;
  category: string;
};

export type AuctionWithProduct = {
  auction_id: string;
  product: {
    name: string;
  };
};
