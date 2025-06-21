'use client';

import { useChatRooms } from '../model/useChatRooms';

import { ChatRoomItem } from './ChatRoomItem';

export const ChatRoomList = ({ currentUserId }: { currentUserId: string }) => {
  const { data: chatRooms, isLoading, isError, error } = useChatRooms(currentUserId);

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (isError) return <div className="p-4 text-red-500">에러: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">내 채팅방</h2>
      <ul className="space-y-2">
        {chatRooms?.map((room) => (
          <ChatRoomItem key={room.room_id} room={room} currentUserId={currentUserId} />
        ))}
      </ul>
    </div>
  );
};
