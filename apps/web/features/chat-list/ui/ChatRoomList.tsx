'use client';

import { useChatList } from '@/shared/api/client/chat/useChatList';

import { containerStyles, errorStyles, listStyles } from './styles/ChatRoomList.styles';
import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = ({ currentUserId }: { currentUserId: string }) => {
  const { data: chatRooms, isLoading, isError, error } = useChatList(currentUserId);

  if (isLoading) return <div className={containerStyles}>로딩 중...</div>;
  if (isError) return <div className={errorStyles}>에러: {error.message}</div>;

  return (
    <div className={containerStyles}>
      <ul className={listStyles}>
        {chatRooms?.map((room) => (
          <ChatRoomListItem key={room.room_id} room={room} currentUserId={currentUserId} />
        ))}
      </ul>
    </div>
  );
};
