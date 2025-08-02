'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@repo/ui/utils/cn';
import { useQueryClient } from '@tanstack/react-query';

import { useMessages } from '@/shared/api/client/chat/useMessages';
import { useMessagesAsRead } from '@/shared/api/client/chat/useMessagesAsRead';

import { formatDateLabel, formatMessageTime, shouldShowDateLabel } from '../model/dateUtils';
import { subscribeToMessages } from '../model/subscribeToMessages';
import { containerStyles, messageRowStyles } from '../styles/ChatMessages.styles';

import { MyMessage } from './MyMessage';
import { TheirMessage } from './TheirMessage';

export const ChatMessages = ({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) => {
  const queryClient = useQueryClient();
  const { data: messages } = useMessages(roomId);
  const { mutate: markAsRead } = useMessagesAsRead();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 최신 메세지를 볼 수 있게 스크롤 맨 아래로
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' }); // 또는 'auto'로 즉시 이동
    }
  }, [messages]);

  // 구독 설정
  useEffect(() => {
    if (!roomId) return;

    let unsubscribe: (() => void) | null = null;

    const setup = async () => {
      unsubscribe = await subscribeToMessages({
        roomId,
        mode: 'room',
        onMessageInsert: () => {
          queryClient.invalidateQueries({ queryKey: ['messages', roomId] });
        },
        onMessageUpdate: () => {
          queryClient.invalidateQueries({ queryKey: ['messages', roomId] });
        },
      });
    };

    setup();

    return () => {
      unsubscribe?.(); // ✅ 반드시 구독 해제 필요
    };
  }, [roomId]);

  //읽음 처리
  useEffect(() => {
    if (!messages) return;

    const unreadIds = messages
      .filter((m) => m.sender_id !== currentUserId && !m.is_read)
      .map((m) => m.message_id);

    if (unreadIds.length > 0) {
      markAsRead(unreadIds);
    }
  }, [messages, currentUserId]);

  if (!messages) return <div>Loading...</div>;

  return (
    <div className={containerStyles}>
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1];
        const isMine = msg.sender_id === currentUserId;

        const showDateLabel = shouldShowDateLabel(msg.sent_at, prevMsg?.sent_at);
        const time = formatMessageTime(msg.sent_at);

        return (
          <div key={msg.message_id}>
            {/* 날짜 */}
            {showDateLabel && (
              <div className="my-5 flex w-full justify-center">
                <div className="h-[14px] w-[179px] bg-white text-center text-[10px] leading-[14px] text-gray-400">
                  {formatDateLabel(msg.sent_at)}
                </div>
              </div>
            )}

            {/* 메세지 */}
            <div
              className={cn(
                messageRowStyles.base,
                isMine ? messageRowStyles.mine : messageRowStyles.theirs
              )}
            >
              {isMine ? (
                <MyMessage msg={msg} time={time} />
              ) : (
                <TheirMessage
                  msg={msg}
                  time={time}
                  showAvatar={!prevMsg || prevMsg.sender_id !== msg.sender_id}
                />
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
