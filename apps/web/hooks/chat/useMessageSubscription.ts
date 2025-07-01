import { supabase } from '@/lib/supabase/supabase';
import { Message } from '@/types/chat';

type Props = {
  roomId: string;
  onMessageInsert: (message: Message) => void;
  onMessageUpdate?: (message: Message) => void;
};

export const subscribeToMessages = ({ roomId, onMessageInsert, onMessageUpdate }: Props) => {
  console.log('[subscribeToMessages] Setting up realtime for room:', roomId);

  const channel = supabase
    .channel(`chat-${roomId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        console.log('[Realtime] INSERT payload:', payload);
        const msg = payload.new as Message;
        onMessageInsert(msg);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        console.log('[Realtime] UPDATE payload:', payload);
        const msg = payload.new as Message;
        onMessageUpdate?.(msg);
      }
    )
    .subscribe((status) => {
      console.log('[subscribeToMessages] subscription status:', status);
    });

  return () => {
    console.log('[subscribeToMessages] Removing channel for room:', roomId);
    supabase.removeChannel(channel);
  };
};
