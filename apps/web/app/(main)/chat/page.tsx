'use client';
import { Authenticated } from '@/features/chat-list/model/Authenticated';
import { ChatRoomList } from '@/features/chat-list/ui/ChatRoomList';

const ChatRoomsPage = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <Authenticated redirectTo="/login">
        {(userId) => <ChatRoomList currentUserId={userId} />}
      </Authenticated>
    </div>
  );
};

export default ChatRoomsPage;
