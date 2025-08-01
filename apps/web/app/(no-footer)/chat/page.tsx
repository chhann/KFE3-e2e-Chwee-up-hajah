'use client';
import { ChatRoomList } from '@/features/chat-list/ui/ChatRoomList';

import { useAuthStore } from '@/shared/stores/auth';

const ChatRoomsPage = () => {
  const userId = useAuthStore((state) => state.userId);
  if (!userId) return <></>;

  return (
    <div className="mx-auto max-w-2xl">
      <ChatRoomList currentUserId={userId} />
      {/* </Authenticated> */}
    </div>
  );
};

export default ChatRoomsPage;
