export type NotificationItem =
  | AuctionOutbidNotification
  | AuctionWonNotification
  | AuctionLostNotification
  | AuctionNoBidNotification;

export interface BaseNotification {
  notification_id: string;
  user_id: string;
  auction_id: string;
  title: string;
  body: string;
  sent_at: string;
  delivery_status: 'not_subscribe' | 'sent' | 'failed';
}

export interface AuctionOutbidNotification extends BaseNotification {
  type: 'auction_outbid';
  data: {
    bid_amount: number;
    product_name: string;
  };
}

export interface AuctionWonNotification extends BaseNotification {
  type: 'auction_won';
  data: {
    winning_bid: number;
    product_name: string;
  };
}

export interface AuctionLostNotification extends BaseNotification {
  type: 'auction_lost';
  data: {
    final_bid: number;
    product_name: string;
  };
}

export interface AuctionNoBidNotification extends BaseNotification {
  type: 'auction_no_bid';
  data: {
    product_name: string;
  };
}
