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

export interface ChatRoomList {
  room_id: string;
  buyer_id: string;
  seller_id: string;
  buyer_nickname: string; // 구매자 닉네임
  seller_nickname: string; // 판매자 닉네임
  opponent_username: string; // 상대방의 닉네임
  opponent_avatar: string | null;
  product_thumbnail: string | null; // 제품 썸네일 이미지
  last_message: string | null; // 마지막 메시지 내용
  last_sent_at: string; // 마지막 메시지 전송 시간 (timestamp)
}

export interface ChatRoomHeaderProps {
  room_id: string;
  product_name: string; // 제품 이름
  thumbnail: string | null; // 제품 썸네일 이미지
  winning_bid_price: number | null; // 낙찰가
  trade_status: 'ongoing' | 'requested' | 'completed'; // 거래 상태
  buyer_id: string; // 구매자 ID
  seller_id: string; // 판매자 ID
  buyer_nickname: string; // 구매자 닉네임
  seller_nickname: string; // 판매자 닉네임
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
