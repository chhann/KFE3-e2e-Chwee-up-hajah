'use client';

import { ChatRoom } from '@/shared/types/chat';
import { FaLocationDot } from 'react-icons/fa6';
import { chatHeaderStyles } from '../styles/ChatRoomHeader.styles';

interface Props {
  room: ChatRoom;
  currentUserId: string;
}

export const ChatRoomHeader = ({ room, currentUserId }: Props) => {
  const isBuyer = currentUserId === room.buyer_id;
  const opponentNickname = isBuyer ? room.seller_nickname : room.buyer_nickname;

  return (
    <div className={chatHeaderStyles.container}>
      <div className={chatHeaderStyles.topSection}>
        <div className={chatHeaderStyles.productInfo}>
          <p className={chatHeaderStyles.productName}>{room.product_name}</p>
          <p className={chatHeaderStyles.nickname}>{opponentNickname}</p>
        </div>
        <div className={chatHeaderStyles.bidInfo}>
          <p>낙찰가</p>
          <p className={chatHeaderStyles.bidAmount}>
            {room.winning_bid_price?.toLocaleString() ?? '100,000'}원
          </p>
        </div>
      </div>

      <div className={chatHeaderStyles.bottomSection}>
        <div className={chatHeaderStyles.locationWrapper}>
          <FaLocationDot className={chatHeaderStyles.locationIcon} />
          <span className="truncate">{room.seller_location}</span>
        </div>

        <button className={chatHeaderStyles.doneButton}>거래 완료</button>
      </div>
    </div>
  );
};
