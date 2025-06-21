'use client';

import { useEffect, useRef, useState } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';

import { supabase } from '../../../lib/supabase/supabase';

type Message = {
  message_id: string;
  room_id: string;
  sender_id: string;
  content: string;
  sent_at: string;
  in_read: string;
  created_at: string;
};

type User = {
  user_id: string;
  nickname: string;
  avatar: string;
};

export const ChatMessages = ({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const channelRef = useRef<any>(null); // ✅ 구독 채널을 기억

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('message')
        .select('*')
        .eq('room_id', roomId)
        .order('sent_at', { ascending: true });

      if (data) {
        setMessages(data);

        const senderIds = Array.from(new Set(data.map((msg) => msg.sender_id)));
        const { data: userData } = await supabase.from('user').select('*').in('user_id', senderIds);

        const userMap: Record<string, User> = {};
        userData?.forEach((user) => {
          userMap[user.user_id] = user;
        });

        setUsers(userMap);
      }
    };

    const subscribeToMessages = () => {
      if (channelRef.current) return; // ✅ 이미 구독 중이면 중복 방지

      const channel = supabase
        .channel(`room-${roomId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'message' },
          (payload) => {
            const newMsg = payload.new as Message;

            if (newMsg.room_id !== roomId) return;
            setMessages((prev) => [...prev, newMsg]);
          }
        )
        .subscribe((status) => {
          console.log('[실시간 구독 상태]', status);
        });

      channelRef.current = channel; // ✅ 채널 저장
    };

    fetchMessages().then(() => {
      subscribeToMessages(); // ✅ fetch 끝난 후 구독 시작
    });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId]);

  return (
    <div className="flex max-h-[600px] flex-col gap-4 overflow-y-auto p-4">
      {messages.map((msg) => {
        const isMine = msg.sender_id === currentUserId;
        const user = users[msg.sender_id];

        return (
          <div
            key={msg.message_id}
            className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
          >
            {/* 👤 상대방 닉네임만 표시 */}
            {!isMine && user?.nickname && (
              <div className="mb-1 text-xs text-gray-500">{user.nickname}</div>
            )}

            <div className="flex items-end gap-2">
              {isMine ? (
                <>
                  {/* 말풍선 */}
                  <div className="max-w-[60%] rounded bg-purple-400 px-4 py-2 text-sm text-white">
                    {msg.content}
                    <div className="mt-1 flex justify-between text-[10px] text-white">
                      <span>
                        {new Date(msg.sent_at).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {/* ✅ 읽음 처리 */}
                      {msg.in_read === '읽음' && <span>✔️</span>}
                    </div>
                  </div>

                  {/* 내 프로필 */}
                  {user && <Avatar src={user.avatar} alt="내 프로필" size="sm" name="Me" />}
                </>
              ) : (
                <>
                  {/* 상대 프로필 */}
                  {user && (
                    <Avatar src={user.avatar} alt={user.nickname} size="sm" name={user.nickname} />
                  )}

                  {/* 말풍선 */}
                  <div className="max-w-[60%] rounded bg-gray-200 px-4 py-2 text-sm text-black">
                    {msg.content}
                    <div className="mt-1 text-right text-[10px] text-gray-500">
                      {new Date(msg.sent_at).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
