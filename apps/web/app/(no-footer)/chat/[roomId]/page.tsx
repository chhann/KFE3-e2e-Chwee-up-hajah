'use client';

import { useParams } from 'next/navigation';

import { LoadingSpinner } from '@/widgets/loading-spiner';

import { ChatInput } from '@/features/chat-room/ui/ChatInput';
import { ChatMessages } from '@/features/chat-room/ui/ChatMessages';
import { ChatRoomHeader } from '@/features/chat-room/ui/ChatRoomHeader';

import { useChatList } from '@/shared/api/client/chat/useChatList';
import { useAuthStore } from '@/shared/stores/auth';

const ChatPage = () => {
  const { roomId } = useParams();
  const currentUserId = useAuthStore((state) => state.userId);
  const { data: chatRooms, isLoading } = useChatList(currentUserId ?? '');

  if (!currentUserId) return <div>로그인이 필요합니다</div>;
  if (typeof roomId !== 'string') return <div>잘못된 접근입니다</div>;
  if (isLoading || !chatRooms)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const room = chatRooms.find((room) => room.room_id === roomId);

  if (!room) return <div>해당 채팅방 정보를 찾을 수 없습니다</div>;

  return (
    <div className="flex h-full flex-col">
      {/* ✅ 상단 헤더 */}
      <ChatRoomHeader room={room} currentUserId={currentUserId} />

      {/* 메시지 리스트 영역 */}
      <div className="flex-1 overflow-y-auto px-2">
        <ChatMessages roomId={roomId} currentUserId={currentUserId} />
      </div>

      {/* 인풋 */}
      <div className="w-full px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        <ChatInput roomId={roomId} senderId={currentUserId} senderName={'test'} />
      </div>
    </div>
  );
};

export default ChatPage;
