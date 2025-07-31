import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';

import useChatSubscriptionStore from '@/shared/stores/chatSubscriptionStore';
import { Message } from '@/shared/types/chat';

type subscribeToMessagesProps = {
  mode: 'room' | 'all';
  roomId?: string; // mode === 'room'일 때만 필요
  onMessageInsert: (message: Message) => void;
  onMessageUpdate: (message: Message) => void;
};

export const subscribeToMessages = async ({
  mode,
  roomId,
  onMessageInsert,
  onMessageUpdate,
}: subscribeToMessagesProps): Promise<() => void> => {
  const channelName = mode === 'room' ? `room:${roomId}` : `message:all`;
  const { subscribe, unsubscribe } = useChatSubscriptionStore.getState();

  const insertOptions: RealtimePostgresChangesFilter<'INSERT'> =
    mode === 'room'
      ? { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` }
      : ({ event: 'INSERT', schema: 'public', table: 'message' } as const);

  const updateOptions: RealtimePostgresChangesFilter<'UPDATE'> =
    mode === 'room'
      ? { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` }
      : { event: 'UPDATE', schema: 'public', table: 'message' };

  subscribe(
    channelName,
    { onInsert: onMessageInsert, onUpdate: onMessageUpdate },
    insertOptions,
    updateOptions
  );

  return () => {
    unsubscribe(channelName);
  };
};
