'use client';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { formatGetMessageTime } from '@/shared/lib/utils/time';
import { ChatRoom } from '@/shared/types/chat';

import { itemStyles, textStyles } from '../styles/ChatRoomItem.styles';

interface Props {
  room: ChatRoom;
  currentUserId: string;
  unreadCount: number; // 읽지 않은 메시지 수
}

export const ChatRoomListItem = ({ room, unreadCount }: Props) => {
  const router = useRouter();

  const opponentNickname = room.opponent_username; // ✅ 그냥 바로 사용

  const formatMessageTIme = formatGetMessageTime(room.last_sent_at);

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(itemStyles.base, 'transition-colors hover:bg-[#eeeeee]')}
      onClick={() => router.push(`/chat/${room.room_id}`)}
    >
      <div className="flex h-full w-full items-center gap-3">
        {/* 프로필 및 제품 이미지 */}
        <div className="relative flex-shrink-0">
          <Avatar
            src={room.opponent_avatar ?? undefined}
            alt="상대방 프로필 이미지"
            size="lg"
            className="relative -left-0 -top-2"
          />
          {room.product_thumbnail && (
            <div className="absolute -right-2 bottom-0">
              <Image
                src={room.product_thumbnail}
                alt="제품 이미지"
                width={25}
                height={25}
                className="h-10 w-10 rounded-md border-2 border-gray-300 bg-gray-300 object-cover"
              />
            </div>
          )}
        </div>

        {/* 닉네임과 최근 메시지 */}
        <div className="flex min-w-0 flex-grow flex-col gap-1">
          <div className={cn(textStyles.opponentNickname, 'font-bold')}>{opponentNickname}</div>
          <div className="h-5 truncate text-sm text-gray-600">
            {room.last_message || <>"상대방과 채팅을 시작해 보세요!"</>}
          </div>
        </div>

        {/* 시간과 안 읽은 메시지 수 */}
        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <div className="h-4 text-[11px] text-gray-500">{formatMessageTIme || <>&nbsp;</>}</div>
          <div className="flex h-5 w-5 items-center justify-center">
            {unreadCount > 0 && (
              <span className="flex h-full w-full items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
