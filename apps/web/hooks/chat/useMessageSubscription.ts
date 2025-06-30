'use client';

import { useEffect, useRef } from 'react';

import { supabase } from '@/lib/supabase/supabase';
import { Message } from '@/types/chat';

type Props = {
  roomId: string;
  onMessageInsert: (message: Message) => void;
  onMessageUpdate?: (message: Message) => void; // 선택적으로 처리 가능
};

export const useMessageSubscription = ({ roomId, onMessageInsert, onMessageUpdate }: Props) => {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // 기존 채널 제거
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    // 새로운 구독 시작
    const channel = supabase
      .channel(`chat-${roomId}`)
      // Insert 이벤트에 대한 구독
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const msg = payload.new as Message;
          if (msg.room_id === roomId) {
            onMessageInsert(msg);
          }
        }
      )
      // UPDATE 메시지 구독 (예: 읽음 처리 등)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'message',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const msg = payload.new as Message;
          onMessageUpdate?.(msg); // 있을 때만 실행
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId, onMessageInsert, onMessageUpdate]);
};
