'use client';

import { useEffect, useMemo, useState } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';

import { useMessages } from '@/hooks/chat/useMessages';
import { useMessagesAsRead } from '@/hooks/chat/useMessagesAsRead';
import { MessageWithSender, SenderInfo } from '@/types/chat';

import { useMessageSubscription } from '../../../hooks/chat/useMessageSubscription';

export const ChatMessages = ({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) => {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const { data } = useMessages(roomId);
  const { mutate: markAsRead } = useMessagesAsRead();

  // fetch 후 메시지 저장
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  // 기존 메시지에서 유저 정보만 추출
  // 메시지의 sender 정보를 매핑
  const userMap: Record<string, SenderInfo> = useMemo(() => {
    const map: Record<string, SenderInfo> = {};
    messages.forEach((m) => {
      map[m.sender_id] = {
        sender_name: m.sender_name,
        sender_avatar: m.sender_avatar,
        sender_address: m.sender_address,
        sender_address_detail: m.sender_address_detail,
        sender_score: m.sender_score,
      };
    });
    return map;
  }, [messages]);

  // 실시간 메시지 수신
  useMessageSubscription({
    roomId,
    onMessageInsert: (msg) => {
      const sender = userMap[msg.sender_id];
      if (sender) {
        const fullMessage: MessageWithSender = { ...msg, ...sender };
        setMessages((prev) => [...prev, fullMessage]);
      }
    },
    onMessageUpdate: (updatedMsg) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.message_id === updatedMsg.message_id
            ? { ...msg, is_read: updatedMsg.is_read } // 필요한 필드만 업데이트
            : msg
        )
      );
    },
  });

  // 읽음 상태 업데이트
  useEffect(() => {
    const unreadMessageIds = messages
      .filter((msg) => msg.sender_id !== currentUserId && !msg.is_read)
      .map((msg) => msg.message_id);

    if (unreadMessageIds.length > 0) {
      markAsRead(unreadMessageIds); // 읽음 처리 API 호출
    }
  }, [messages, currentUserId]); // markAsRead는 일부러 넣지 않음

  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {messages.map((msg) => {
        const isMine = msg.sender_id === currentUserId;

        return (
          <div
            key={msg.message_id}
            className={`flex items-end ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            {/* 상대방 프로필 */}
            {!isMine && (
              <Avatar
                src={msg.sender_avatar ?? undefined}
                alt=""
                size="sm"
                name={msg.sender_name}
                className="mr-2"
              />
            )}

            {/* 메시지 박스 */}
            <div
              className={`relative max-w-[70%] rounded-xl px-4 py-2 text-sm leading-tight shadow-sm ${
                isMine
                  ? 'rounded-br-none bg-[#BEAFFC] text-white'
                  : 'rounded-bl-none bg-gray-200 text-black'
              }`}
            >
              {msg.content}

              <div
                className={`max-w-[70%] rounded-xl px-4 py-2 text-sm leading-tight shadow-sm ${
                  isMine
                    ? 'rounded-br-none bg-[#BEAFFC] text-white'
                    : 'rounded-bl-none bg-gray-200 text-black'
                }`}
              >
                {msg.content}
                <div
                  className={`mt-1 text-[10px] ${
                    isMine ? 'text-right text-white' : 'text-right text-gray-500'
                  }`}
                >
                  {new Date(msg.sent_at).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {/* ✅ 안 읽은 내 메시지일 경우에만 읽음 표시 */}
              {isMine && !msg.is_read && (
                <div className="absolute -right-4 bottom-0 text-xs text-red-500">1</div>
              )}
            </div>

            {/* 내 프로필 (선택) */}
            {isMine && (
              <Avatar
                src={msg.sender_avatar ?? undefined}
                alt=""
                size="sm"
                name="Me"
                className="ml-2"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
