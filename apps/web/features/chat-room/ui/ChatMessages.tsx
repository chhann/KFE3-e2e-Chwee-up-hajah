'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';

import { useMessages } from '@/hooks/chat/useMessages';
import { useMessagesAsRead } from '@/hooks/chat/useMessagesAsRead';
import { subscribeToMessages } from '@/hooks/chat/useMessageSubscription';
import { Message, MessageWithSender } from '@/types/chat';

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
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const { data } = useMessages(roomId);
  const { mutate: markAsRead } = useMessagesAsRead();
  const subscriptionRef = useRef<() => void | null>(null);

  // 최초 fetch된 메시지 세팅
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  // onMessageInsert 콜백
  const onMessageInsert = useCallback((msg: Message) => {
    setMessages((prev) => {
      const sender = prev.find((m) => m.sender_id === msg.sender_id);
      if (!sender) {
        console.warn('[onMessageInsert] sender info not found for', msg.sender_id);
        return prev;
      }

      const fullMessage: MessageWithSender = {
        ...msg,
        sender_name: sender.sender_name,
        sender_avatar: sender.sender_avatar,
        sender_address: sender.sender_address,
        sender_address_detail: sender.sender_address_detail,
        sender_score: sender.sender_score,
      };

      return [...prev, fullMessage];
    });
  }, []);

  // onMessageUpdate 콜백
  const onMessageUpdate = useCallback((updatedMsg: Message) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.message_id === updatedMsg.message_id ? { ...msg, is_read: updatedMsg.is_read } : msg
      )
    );
  }, []);

  // ✅ 구독은 메시지가 한번 로드된 이후 roomId에만 의존하여 실행 (단, 구독 중복 방지)
  useEffect(() => {
    if (!data || data.length === 0 || subscriptionRef.current) return;

    console.log('[ChatMessages] subscribing to realtime only once');

    subscriptionRef.current = subscribeToMessages({
      roomId,
      onMessageInsert: (msg) => {
        console.log('[Realtime] INSERT received:', msg);
        onMessageInsert(msg);
      },
      onMessageUpdate: (msg) => {
        console.log('[Realtime] UPDATE received:', msg);
        onMessageUpdate(msg);
      },
    });

    // cleanup 등록하지 않음 (페이지 생명주기 유지 목적)
  }, [roomId, onMessageInsert, onMessageUpdate, data]);

  // 읽음 처리
  useEffect(() => {
    const unreadIds = messages
      .filter((m) => m.sender_id !== currentUserId && !m.is_read)
      .map((m) => m.message_id);

    if (unreadIds.length > 0) {
      markAsRead(unreadIds);
    }
  }, [messages, currentUserId]);

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
    </div>
  );
};
