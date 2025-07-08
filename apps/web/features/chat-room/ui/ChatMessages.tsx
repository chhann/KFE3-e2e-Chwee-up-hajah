'use client';

import { useEffect, useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';

import { useMessages } from '@/shared/api/client/chat/useMessages';
import { useMessagesAsRead } from '@/shared/api/client/chat/useMessagesAsRead';
import { useQueryClient } from '@tanstack/react-query';
import { subscribeToMessages } from '../model/subscribeToMessages';

import {
  containerStyles,
  messageBubbleStyles,
  messageRowStyles,
  timestampStyles,
  unreadIndicatorStyles,
} from './styles/ChatMessages.styles';

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
  const subscriptionRef = useRef<() => void | null>(null);
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

  // 읽음 처리
  // useEffect(() => {
  //   const unreadIds = messages
  //     .filter((m) => m.sender_id !== currentUserId && !m.is_read)
  //     .map((m) => m.message_id);

  //   if (unreadIds.length > 0) {
  //     markAsRead(unreadIds);
  //   }
  // }, [messages, currentUserId]);

  if (!messages) return <div>Loading...</div>;

  return (
    <div className={containerStyles}>
      {messages.map((msg) => {
        const isMine = msg.sender_id === currentUserId;

        return (
          <div
            key={msg.message_id}
            className={cn(
              messageRowStyles.base,
              isMine ? messageRowStyles.mine : messageRowStyles.theirs
            )}
          >
            {!isMine && (
              <Avatar
                src={msg.sender_avatar ?? undefined}
                alt=""
                size="sm"
                name={msg.sender_name}
                className="mr-2"
              />
            )}

            <div
              className={cn(
                messageBubbleStyles.base,
                isMine ? messageBubbleStyles.mine : messageBubbleStyles.theirs
              )}
            >
              {msg.content}
              <div
                className={cn(
                  timestampStyles.base,
                  isMine ? timestampStyles.mine : timestampStyles.theirs
                )}
              >
                {new Date(msg.sent_at).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {isMine && !msg.is_read && <div className={unreadIndicatorStyles}>1</div>}
            </div>

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
      <div ref={bottomRef} />
    </div>
  );
};
