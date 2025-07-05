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
