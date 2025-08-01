export type NotificationItem =
  | AuctionOutbidNotification
  | AuctionWonNotification
  | AuctionLostNotification
  | AuctionNoBidNotification
  | TradeRequestNotification
  | TradeRejectedNotification
  | TradeCompletedNotification;

export interface BaseNotification {
  notification_id: string;
  user_id: string;
  auction_id?: string; // 경매 관련 알림에만 존재
  room_id?: string; // 채팅방 관련 알림에만 존재
  title: string;
  body: string;
  sent_at: string;

  delivery_status:
    | 'not_subscribe'
    | 'sent'
    | 'failed'
    | 'partial'
    | 'expired_or_not_found'
    | 'network_error';
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

export interface TradeRequestNotification extends BaseNotification {
  type: 'trade_request';
  data: {
    product_name: string;
  };
}

export interface TradeRejectedNotification extends BaseNotification {
  type: 'trade_rejected';
  data: {
    product_name: string;
  };
}

export interface TradeCompletedNotification extends BaseNotification {
  type: 'trade_completed';
  data: {
    product_name: string;
  };
}
