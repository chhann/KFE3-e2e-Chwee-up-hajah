'use client';

import { useParams } from 'next/navigation';

import { ChatInput } from '../../../../features/chatroom/ui/ChatInput';
import { ChatMessages } from '../../../../features/chatroom/ui/ChatMessages';

const ChatPage = () => {
  const params = useParams();

  if (!params || typeof params.roomId !== 'string') {
    return <div>잘못된 접근입니다</div>;
  }

  const roomId = params.roomId;

  const senderId = '9a21a88a-94f1-4a4b-b0f6-aaa111111111'; 
  // 3b12f91e-f14c-4d34-9a5b-bbb222222222 영희 구매
  // 9a21a88a-94f1-4a4b-b0f6-aaa111111111 철수 판매

  return (
    <div className="mx-auto mt-10 flex max-w-md flex-col rounded border p-4 shadow">
      <h1 className="mb-4 text-lg font-bold">테스트 채팅방</h1>
      <ChatMessages roomId={roomId} currentUserId={senderId} />
      <ChatInput roomId={roomId} senderId={senderId} />
    </div>
  );
};

export default ChatPage;

