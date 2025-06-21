'use client';

import { useEffect, useRef } from 'react';

import { Message } from '../../../entities/chat/types';
import { supabase } from '../../../lib/supabase/supabase';

export const useMessageSubscription = ({
  roomId,
  onInitialMessages,
  onMessage,
}: {
  roomId: string;
  onInitialMessages: (messages: Message[]) => void;
  onMessage: (message: Message) => void;
}) => {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      // 먼저 메시지 불러오기
      const { data } = await supabase
        .from('message')
        .select('*')
        .eq('room_id', roomId)
        .order('sent_at', { ascending: true });

      if (data) {
        onInitialMessages(data);
      }

      // 구독 시작
      if (!channelRef.current) {
        const channel = supabase
          .channel(`chat-${roomId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'message',
            },
            (payload) => {
              const msg = payload.new as Message;
              if (msg.room_id === roomId) onMessage(msg);
            }
          )
          .subscribe();

        channelRef.current = channel;
      }
    };

    init();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId]);
};
