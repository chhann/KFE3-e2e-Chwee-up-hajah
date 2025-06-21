// features/chatRooms/ui/ChatRoomItem.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaLocationDot } from 'react-icons/fa6';

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
      className="group relative h-[93px] w-full cursor-pointer overflow-hidden rounded-[6px] border border-white/10 bg-[#BEAFFC] px-4 py-3 shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2)] backdrop-blur-sm transition active:bg-[#7251F8]"
      onClick={() => router.push(`/chat/${room.room_id}`)}
    >
      <div className="flex h-full flex-col justify-between">
        {/* 상단: 상품명, 닉네임 */}
        <div className="flex flex-col gap-[2px] overflow-hidden">
          <div className="truncate text-sm font-semibold text-white">{room.product_name}</div>
          <div className="truncate text-xs text-white">{opponentNickname}</div>
        </div>

        {/* 하단: 위치와 낙찰가 (양쪽 정렬) */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1 truncate text-xs text-white">
            <span className="leading-none text-pink-500">
              <FaLocationDot />
            </span>
            <span>서울시 강남구</span>
          </div>
          <div className="whitespace-nowrap text-right">
            <p className="mb-[2px] text-[10px] leading-none text-[#656565] group-active:text-white">
              낙찰가
            </p>
            <p className="text-base font-bold leading-tight text-white">50,000원</p>
          </div>
        </div>
      </div>
    </li>
  );
};
