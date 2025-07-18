import { supabase } from '@/shared/lib/supabase/supabase';
import { Message } from '@/shared/types/chat';
import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';

// type Props = {
//   roomId: string;
//   onMessageInsert: (message: Message) => void;
//   onMessageUpdate: (message: Message) => void;
// };

// export const subscribeToMessages = async ({
//   roomId,
//   onMessageInsert,
//   onMessageUpdate,
// }: Props): Promise<() => void> => {
//   const channelName = `room:${roomId}`;

//   // 이미 등록된 채널이 있는지 확인
//   const existing = supabase.getChannels().find((ch) => ch.topic === `realtime:${channelName}`);
//   if (existing) {
//     console.warn(`[subscribeToMessages] channel ${channelName} already exists.`);
//     return () => supabase.removeChannel(existing);
//   }

//   const channel = supabase.channel(channelName);

//   channel
//     .on(
//       'postgres_changes',
//       { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
//       (payload) => {
//         console.log('[Realtime] INSERT received:', payload.new);
//         onMessageInsert(payload.new as Message);
//       }
//     )
//     .on(
//       'postgres_changes',
//       { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
//       (payload) => {
//         console.log('[Realtime] UPDATE received:', payload.new);
//         onMessageUpdate(payload.new as Message);
//       }
//     );

//   const result = await channel.subscribe();
//   console.log(result);

//   return () => {
//     supabase.removeChannel(channel);
//   };
// };

type Mode = 'room' | 'all';

type subscribeToMessagesProps = {
  mode: Mode;
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

  const existing = supabase.getChannels().find((ch) => ch.topic === `realtime:${channelName}`);
  if (existing) {
    console.warn(`[subscribeToMessages] channel ${channelName} already exists.`);
    return () => supabase.removeChannel(existing);
  }

  const channel = supabase.channel(channelName);

  const insertOptions: RealtimePostgresChangesFilter<'INSERT'> =
    mode === 'room'
      ? { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` }
      : ({ event: 'INSERT', schema: 'public', table: 'message' } as const);

  const updateOptions: RealtimePostgresChangesFilter<'UPDATE'> =
    mode === 'room'
      ? { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` }
      : { event: 'UPDATE', schema: 'public', table: 'message' };

  channel
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        console.log('[Realtime] INSERT received:', payload.new);
        onMessageInsert(payload.new as Message);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
      (payload) => {
        console.log('[Realtime] UPDATE received:', payload.new);
        onMessageUpdate(payload.new as Message);
      }
    );

  const result = await channel.subscribe();
  console.log(result, '실행 결과');

  return () => {
    supabase.removeChannel(channel);
  };
};
