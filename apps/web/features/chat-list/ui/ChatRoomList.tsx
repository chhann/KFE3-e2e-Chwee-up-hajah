'use client';

import { useChatList } from '@/shared/api/client/chat/useChatList';

import { subscribeToMessages } from '@/features/chat-room/model/subscribeToMessages';
import { useUnreadCountMap } from '@/shared/api/client/chat/useUnreadMessageCount ';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { containerStyles, errorStyles, listStyles } from '../styles/ChatRoomList.styles';
import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = ({ currentUserId }: { currentUserId: string }) => {
  const [tab, setTab] = useState<'buying' | 'selling'>('buying');
  const { data: chatRooms, isLoading, isError, error } = useChatList(currentUserId);
  const { data: unreadCountMap } = useUnreadCountMap();
  const queryClient = useQueryClient();

  // ✅ 않읽은 메세지 수 실시간 반영
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setup = async () => {
      unsubscribe = await subscribeToMessages({
        mode: 'all',
        onMessageInsert: (message) => {
          if (!message.is_read) {
            queryClient.invalidateQueries({ queryKey: ['unreadCountMap'] });
          }
          queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
        },
        onMessageUpdate: () => {
          queryClient.invalidateQueries({ queryKey: ['unreadCountMap'] });
          queryClient.invalidateQueries({ queryKey: ['chatrooms'] });
        },
      });
    };

    setup();

    return () => unsubscribe?.();
  }, []);

  if (isLoading) return <div className={containerStyles}>로딩 중...</div>;
  if (isError) return <div className={errorStyles}>에러: {error.message}</div>;

  const filteredRooms =
    tab === 'buying'
      ? chatRooms?.filter((room) => room.buyer_id === currentUserId)
      : chatRooms?.filter((room) => room.seller_id === currentUserId);

  return (
    <div className={containerStyles}>
      {/* 탭 버튼 */}
      <div className="mb-[43px] bg-white">
        <div className="flex">
          {/* 판매 탭 */}
          <button
            className={`w-full py-3 text-center font-semibold outline-none transition-all ${
              tab === 'selling' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('selling')}
          >
            판매
          </button>

          {/* 구매 탭 */}
          <button
            className={`w-full py-3 text-center font-semibold outline-none transition-all ${
              tab === 'buying' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('buying')}
          >
            구매
          </button>
        </div>
      </div>

      {/* 채팅방 리스트 아이템들 */}
      <ul className={listStyles}>
        {filteredRooms
          ?.slice()
          .sort((a, b) => {
            const aUnread = unreadCountMap?.[a.room_id] ?? 0;
            const bUnread = unreadCountMap?.[b.room_id] ?? 0;

            if (aUnread > 0 && bUnread === 0) return -1; // 안 읽은 메시지가 있는 방이 위로
            if (aUnread === 0 && bUnread > 0) return 1;

            // ✅ 여기만 last_sent_at으로 수정
            const aTime = new Date(a.last_sent_at ?? 0).getTime(); // 최신 메시지 기준 정렬
            const bTime = new Date(b.last_sent_at ?? 0).getTime();
            return bTime - aTime;
          })
          .map((room) => (
            <ChatRoomListItem
              key={room.room_id}
              room={room}
              currentUserId={currentUserId}
              unreadCount={unreadCountMap?.[room.room_id] ?? 0}
            />
          ))}
      </ul>
    </div>
  );
};
