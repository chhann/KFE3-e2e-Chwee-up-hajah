'use client';

import { useChatList } from '@/shared/api/client/chat/useChatList';
import { ChatRoomItem } from './ChatRoomItem';
import {
  containerStyles,
  errorStyles,
  listStyles,
  titleStyles,
} from './styles/ChatRoomList.styles';

export const ChatRoomList = ({ currentUserId }: { currentUserId: string }) => {
  const { data: chatRooms, isLoading, isError, error } = useChatList(currentUserId);

  if (isLoading) return <div className={containerStyles}>로딩 중...</div>;
  if (isError) return <div className={errorStyles}>에러: {error.message}</div>;

  return (
    <div className={containerStyles}>
      <h2 className={titleStyles}>내 채팅방</h2>
      <ul className={listStyles}>
        {chatRooms?.map((room) => (
          <ChatRoomItem key={room.room_id} room={room} currentUserId={currentUserId} />
        ))}
      </ul>
    </div>
  );
};
