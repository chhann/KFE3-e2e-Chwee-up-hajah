'use client';

import { useEffect, useState } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';

import { useMessages } from '../model/useFetchMessages';
import { useMessageSubscription } from '../model/useMessageSubscription';

import { Message, User } from '@/app/api/chat/types';
import { supabase } from '@/lib/supabase/supabase';

export const ChatMessages = ({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const { data } = useMessages(roomId);

  // fetch 후 메시지 저장
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  // 유저 정보 로딩
  useEffect(() => {
    const loadUsers = async () => {
      const ids = [...new Set(messages.map((m) => m.sender_id))];
      const { data } = await supabase.from('user').select('*').in('user_id', ids);
      const map: Record<string, User> = {};
      data?.forEach((u) => (map[u.user_id] = u));
      setUsers(map);
    };
    if (messages.length > 0) loadUsers();
  }, [messages]);

  // 실시간 메시지 수신
  useMessageSubscription({
    roomId,
    onInitialMessages: setMessages,
    onMessage: (msg) => setMessages((prev) => [...prev, msg]),
  });
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {messages.map((msg) => {
        const isMine = msg.sender_id === currentUserId;
        const user = users[msg.sender_id];

        return (
          <div
            key={msg.message_id}
            className={`flex items-end ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!isMine && user && (
              <Avatar
                src={user.avatar ?? undefined}
                alt=""
                size="sm"
                name={user.nickname}
                className="mr-2"
              />
            )}

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

            {isMine && user && (
              <Avatar src={user.avatar ?? undefined} alt="" size="sm" name="Me" className="ml-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};
