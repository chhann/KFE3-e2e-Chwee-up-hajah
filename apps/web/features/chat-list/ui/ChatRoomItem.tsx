'use client';

import { cn } from '@repo/ui/utils/cn';
import { useRouter } from 'next/navigation';
import { FaLocationDot } from 'react-icons/fa6';

import { itemStyles, textStyles } from './styles/ChatRoomItem.styles';

type ChatRoom = {
  room_id: string;
  product_id: string;
  product_name: string;
  buyer_id: string;
  buyer_nickname: string;
  seller_id: string;
  seller_nickname: string;
  created_at: string;
};

interface Props {
  room: ChatRoom;
  currentUserId: string;
}

export const ChatRoomItem = ({ room, currentUserId }: Props) => {
  const router = useRouter();

  const isBuyer = currentUserId === room.buyer_id;
  const opponentNickname = isBuyer ? room.seller_nickname : room.buyer_nickname;

  return (
    <li
      className={cn(itemStyles.base, itemStyles.bg, itemStyles.activeBg)}
      onClick={() => router.push(`/chat/${room.room_id}`)}
    >
      <div className="flex h-full flex-col justify-between">
        {/* 상단: 상품명, 닉네임 */}
        <div className="flex flex-col gap-[2px] overflow-hidden">
          <div className={textStyles.productName}>{room.product_name}</div>
          <div className={textStyles.opponentNickname}>{opponentNickname}</div>
        </div>

        {/* 하단: 위치와 낙찰가 (양쪽 정렬) */}
        <div className="flex items-end justify-between">
          <div className={textStyles.location}>
            <span className={textStyles.locationIcon}>
              <FaLocationDot />
            </span>
            <span>서울시 강남구</span>
          </div>
          <div className="whitespace-nowrap text-right">
            <p className={textStyles.priceLabel}>낙찰가</p>
            <p className={textStyles.price}>50,000원</p>
          </div>
        </div>
      </div>
    </li>
  );
};
