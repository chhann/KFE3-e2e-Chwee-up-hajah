'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';

import { Message, MessageWithSender } from '@/shared/types/chat';

import { useMessages } from '@/shared/api/client/chat/useMessages';
import { useMessagesAsRead } from '@/shared/api/client/chat/useMessagesAsRead';
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
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const { data } = useMessages(roomId);
  const { mutate: markAsRead } = useMessagesAsRead();
  const subscriptionRef = useRef<() => void | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 최초 fetch된 메시지 세팅
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' }); // 또는 'auto'로 즉시 이동
    }
  }, [messages]);

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
    if (!data || data.length === 0) return;

    let unsubscribe: (() => void) | null = null;
    let isUnmounted = false;

    const setupSubscription = async () => {
      // 이전 구독이 있다면 제거 후 딜레이
      if (subscriptionRef.current) {
        subscriptionRef.current();
        subscriptionRef.current = null;

        // 💡 WebSocket 안정적으로 닫힐 시간 확보
        await new Promise((res) => setTimeout(res, 300));
      }

      if (isUnmounted) return;

      console.log('[ChatMessages] subscribing to realtime');
      unsubscribe = subscribeToMessages({
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

      subscriptionRef.current = unsubscribe;
    };

    setupSubscription();

    return () => {
      isUnmounted = true;
      console.log('[ChatMessages] unsubscribing from realtime');
      unsubscribe?.();
    };
  }, [roomId, onMessageInsert, onMessageUpdate, data]);

  // 읽음 처리
  // useEffect(() => {
  //   const unreadIds = messages
  //     .filter((m) => m.sender_id !== currentUserId && !m.is_read)
  //     .map((m) => m.message_id);

  //   if (unreadIds.length > 0) {
  //     markAsRead(unreadIds);
  //   }
  // }, [messages, currentUserId]);

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
