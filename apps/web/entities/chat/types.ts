export type ChatRoom = {
  room_id: string;
  product_id: string;
  product_name: string;
  buyer_id: string;
  buyer_nickname: string;
  seller_id: string;
  seller_nickname: string;
  created_at: string;
};

export type Message = {
  message_id: string;
  room_id: string;
  sender_id: string;
  content: string;
  sent_at: string;     // timestamp
  is_read: boolean;    // 읽음 여부
  created_at: string;  // timestamptz
};

export type User = {
  user_id: string;             // uuid
  nickname: string;           // text
  email: string;              // text
  password: string;           // text
  created_at: string;         // timestamptz
  score: number | null;       // numeric (nullable로 가정)
  sold_auction: string | null;    // uuid
  selling_auction: string | null; // uuid
  bought_auction: string | null;  // uuid
  buying_auction: string | null;  // uuid
  avatar: string | null;      // text
  address: string | null;     // text
};