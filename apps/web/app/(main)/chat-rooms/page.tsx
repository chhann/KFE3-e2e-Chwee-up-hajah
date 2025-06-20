'use client';

import { ChatRoomList } from '../../../features/chat-list/ui/ChatRoomList';

const chatRoomsPage = () => {
  const userId = '9a21a88a-94f1-4a4b-b0f6-aaa111111111'; // 영희로 예시 나중에 현재 토큰에서 정보를 가져오기
  // 3b12f91e-f14c-4d34-9a5b-bbb222222222 영희 구매
  // 9a21a88a-94f1-4a4b-b0f6-aaa111111111 철수 판매


  return (
    <main className="mx-auto max-w-2xl">
      <ChatRoomList currentUserId={userId} />
    </main>
  );
};

export default chatRoomsPage;
