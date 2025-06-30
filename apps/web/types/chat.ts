export type MessageWithSender = {
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
};

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
  sent_at: string; // timestamp
  is_read: boolean; // 읽음 여부
  created_at: string; // timestamptz
};

// ✅ sender만 따로 분리한 타입
// 유지보수를 위해 자동 유도 방식으로 구성
export type SenderInfo = Pick<
  MessageWithSender,
  'sender_name' | 'sender_avatar' | 'sender_address' | 'sender_address_detail' | 'sender_score'
>;
