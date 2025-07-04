import { supabase } from '@/lib/supabase/supabase';
import { Message } from '@/types/chat';

type Props = {
  roomId: string;
  onMessageInsert: (message: Message) => void;
  onMessageUpdate: (message: Message) => void;
};

export const subscribeToMessages = ({ roomId, onMessageInsert, onMessageUpdate }: Props) => {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        onMessageInsert(payload.new as Message);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        onMessageUpdate(payload.new as Message);
      }
    )
    .subscribe((status) => {
      console.log('[subscribeToMessages] subscription status:', status);
    });

  // 반드시 unsubscribe 반환
  return () => {
    supabase.removeChannel(channel);
  };
};
