'use client';

import { useParams } from 'next/navigation';

import { ChatInput } from '../../../../features/chat-room/ui/ChatInput';
import { ChatMessages } from '../../../../features/chat-room/ui/ChatMessages';

const ChatPage = () => {
  const params = useParams();

  if (!params || typeof params.roomId !== 'string') {
    return <div>잘못된 접근입니다</div>;
  }

  const roomId = params.roomId;

  const senderId = '3b12f91e-f14c-4d34-9a5b-bbb222222222';
  // 3b12f91e-f14c-4d34-9a5b-bbb222222222 영희 구매
  // 9a21a88a-94f1-4a4b-b0f6-aaa111111111 철수 판매

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
