'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { LoadingSpinner } from '@/widgets/loading-spiner';

import { subscribeToMessages } from '@/features/chat-room/model/subscribeToMessages';

import { useChatList } from '@/shared/api/client/chat/useChatList';
import { useUnreadCountMap } from '@/shared/api/client/chat/useUnreadMessageCount';

import { errorStyles } from '../styles/ChatRoomList.styles';

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
  }, [queryClient]);

  // ✅ 최신 메시지 온 탭으로 자동 이동
  useEffect(() => {
    if (chatRooms && chatRooms.length > 0) {
      const mostRecentRoom = [...chatRooms].sort((a, b) => {
        const aTime = new Date(a.last_sent_at ?? 0).getTime();
        const bTime = new Date(b.last_sent_at ?? 0).getTime();
        return bTime - aTime;
      })[0];

      if (mostRecentRoom) {
        if (mostRecentRoom.buyer_id === currentUserId) {
          setTab('buying');
        } else if (mostRecentRoom.seller_id === currentUserId) {
          setTab('selling');
        }
      }
    }
  }, [chatRooms, currentUserId]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <div className={errorStyles}>에러: {error.message}</div>;

  const filteredRooms =
    tab === 'buying'
      ? chatRooms?.filter((room) => room.buyer_id === currentUserId)
      : chatRooms?.filter((room) => room.seller_id === currentUserId);

  console.log(chatRooms, 'chatRooms');

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="mb-[12px] bg-white">
        <div className="flex">
          {/* 판매 탭 */}
          <button
            className={`w-full cursor-pointer py-3 text-center font-semibold outline-none transition-all ${
              tab === 'selling' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('selling')}
          >
            판매
          </button>

          {/* 구매 탭 */}
          <button
            className={`w-full cursor-pointer py-3 text-center font-semibold outline-none transition-all ${
              tab === 'buying' ? 'border-b border-[#8F8F8F] text-black' : 'text-gray-400'
            }`}
            onClick={() => setTab('buying')}
          >
            구매
          </button>
        </div>
      </div>

      {/* 채팅방 리스트 아이템들 */}
      <div className="relative flex-grow">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab} // 탭이 변경될 때마다 리스트 전체를 다시 렌더링하며 애니메이션 트리거
            className="divide-y divide-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredRooms
              ?.slice()
              .sort((a, b) => {
                const aUnread = unreadCountMap?.[a.room_id] ?? 0;
                const bUnread = unreadCountMap?.[b.room_id] ?? 0;

                if (aUnread > 0 && bUnread === 0) return -1; // 안 읽은 메시지가 있는 방이 위로
                if (aUnread === 0 && bUnread > 0) return 1;

                // 여기만 last_sent_at으로 수정
                const aTime = new Date(a.last_sent_at ?? 0).getTime(); // 최신 메시지 기준 정렬
                const bTime = new Date(b.last_sent_at ?? 0).getTime();
                return bTime - aTime;
              })
              .map((room) => (
                <motion.li
                  key={room.room_id}
                  layout // 핵심: 아이템 순서 변경 시 부드럽게 이동
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <ChatRoomListItem
                    key={room.room_id}
                    room={room}
                    currentUserId={currentUserId}
                    unreadCount={unreadCountMap?.[room.room_id] ?? 0}
                  />
                </motion.li>
              ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
};
