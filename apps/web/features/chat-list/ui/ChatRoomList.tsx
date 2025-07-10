'use client';

import { useChatList } from '@/shared/api/client/chat/useChatList';

import { useState } from 'react';
import { ChatRoomListItem } from './ChatRoomListItem';
import { containerStyles, errorStyles, listStyles } from './styles/ChatRoomList.styles';

export const ChatRoomList = ({ currentUserId }: { currentUserId: string }) => {
  const [tab, setTab] = useState<'buying' | 'selling'>('buying');
  const { data: chatRooms, isLoading, isError, error } = useChatList(currentUserId);

  if (isLoading) return <div className={containerStyles}>로딩 중...</div>;
  if (isError) return <div className={errorStyles}>에러: {error.message}</div>;

  const filteredRooms =
    tab === 'buying'
      ? chatRooms?.filter((room) => room.buyer_id === currentUserId)
      : chatRooms?.filter((room) => room.seller_id === currentUserId);

  return (
    <div className={containerStyles}>
      {/* 탭 버튼 */}
      <div className="mb-[43px] bg-white">
        <div className="flex">
          {/* 판매 탭 */}
          <button
            className={`w-full py-3 text-center font-semibold outline-none transition-all ${
              tab === 'selling' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('selling')}
          >
            판매
          </button>

          {/* 구매 탭 */}
          <button
            className={`w-full py-3 text-center font-semibold outline-none transition-all ${
              tab === 'buying' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('buying')}
          >
            구매
          </button>
        </div>
      </div>

      {/* 채팅방 리스트 아이템들 */}
      <ul className={listStyles}>
        {filteredRooms?.map((room) => (
          <ChatRoomListItem key={room.room_id} room={room} currentUserId={currentUserId} />
        ))}
      </ul>
    </div>
  );
};
