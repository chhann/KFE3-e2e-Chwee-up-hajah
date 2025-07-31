export interface MessageWithSender {
  // message 테이블에서 온 필드들
  message_id: string;
  room_id: string;
  sender_id: string;
  content: string;
  sent_at: string;
  is_read: boolean;
  created_at: string;

  // user 테이블에서 join된 필드들 (뷰에서 alias 사용)
  sender_name: string;
  sender_avatar: string | null;
  sender_address: string | null;
  sender_address_detail: string | null;
  sender_score: number | null;
}

export interface ChatRoom {
  room_id: string;
  buyer_id: string;
  seller_id: string;
  opponent_id: string;
  opponent_username: string;
  opponent_avatar: string | null;
  opponent_grade: string | null;
  opponent_score: number | null;
  product_thumbnail: string | null;
  last_message: string | null;
  last_sent_at: string | null;
}

export interface Message {
  message_id: string;
  room_id: string;
  sender_id: string;
  content: string;
  sent_at: string; // timestamp
  is_read: boolean; // 읽음 여부
  created_at: string; // timestamptz
}
