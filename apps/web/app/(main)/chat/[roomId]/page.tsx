'use client';

import { useParams } from 'next/navigation';

import { ChatInput } from '@/features/chat-room/ui/ChatInput';
import { ChatMessages } from '@/features/chat-room/ui/ChatMessages';

import { useAuthStore } from '@/stores/auth';

const ChatPage = () => {
  const { roomId } = useParams();
  const senderId = useAuthStore((state) => state.userId);

  if (!senderId) {
    return <div>로그인이 필요합니다</div>;
  }

  if (typeof roomId !== 'string') {
    return <div>잘못된 접근입니다</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {/* 메시지 리스트 영역 */}
      <div className="flex-1 overflow-y-auto px-2">
        <ChatMessages roomId={roomId} currentUserId={senderId} />
      </div>

      {/* 인풋 */}
      <div className="w-full px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        <ChatInput roomId={roomId} senderId={senderId} />
      </div>
    </div>
  );
};

export default ChatPage;
