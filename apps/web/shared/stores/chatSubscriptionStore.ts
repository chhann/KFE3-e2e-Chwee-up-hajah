import { RealtimeChannel, RealtimePostgresChangesFilter } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '@/shared/lib/supabase/supabase';
import { Message } from '@/shared/types/chat';

type ChannelName = string;

type SubscriptionOptions = {
  onInsert: (message: Message) => void;
  onUpdate: (message: Message) => void;
};

type ChatSubscriptionState = {
  channels: Map<ChannelName, RealtimeChannel>;
  refCounts: Map<ChannelName, number>;
  subscriptions: Map<ChannelName, SubscriptionOptions>;
};

type ChatSubscriptionActions = {
  subscribe: (
    channelName: ChannelName,
    options: SubscriptionOptions,
    insertOptions: RealtimePostgresChangesFilter<'INSERT'>,
    updateOptions: RealtimePostgresChangesFilter<'UPDATE'>
  ) => void;
  unsubscribe: (channelName: ChannelName) => void;
};

const useChatSubscriptionStore = create<ChatSubscriptionState & ChatSubscriptionActions>(
  (set, get) => ({
    channels: new Map(),
    refCounts: new Map(),
    subscriptions: new Map(),

    subscribe: (channelName, options, insertOptions, updateOptions) => {
      set((state) => {
        const newRefCounts = new Map(state.refCounts);
        const currentRefCount = newRefCounts.get(channelName) || 0;
        newRefCounts.set(channelName, currentRefCount + 1);

        const newChannels = new Map(state.channels);
        const newSubscriptions = new Map(state.subscriptions);

        if (currentRefCount === 0) {
          const channel = supabase.channel(channelName);
          channel
            .on('postgres_changes', insertOptions, (payload) => {
              console.log(`[Realtime:${channelName}] INSERT`, payload.new);
              get()
                .subscriptions.get(channelName)
                ?.onInsert(payload.new as Message);
            })
            .on('postgres_changes', updateOptions, (payload) => {
              console.log(`[Realtime:${channelName}] UPDATE`, payload.new);
              get()
                .subscriptions.get(channelName)
                ?.onUpdate(payload.new as Message);
            });

          channel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log(`[subscribeToMessages] channel ${channelName} subscribed successfully.`);
            } else {
              console.error(
                `[subscribeToMessages] channel ${channelName} subscription error:`,
                status
              );
            }
          });

          newChannels.set(channelName, channel);
          newSubscriptions.set(channelName, options);

          return {
            channels: newChannels,
            refCounts: newRefCounts,
            subscriptions: newSubscriptions,
          };
        }

        return { refCounts: newRefCounts };
      });
    },

    unsubscribe: (channelName) => {
      set((state) => {
        const newRefCounts = new Map(state.refCounts);
        const currentRefCount = newRefCounts.get(channelName);

        if (currentRefCount && currentRefCount > 1) {
          newRefCounts.set(channelName, currentRefCount - 1);
          return { refCounts: newRefCounts };
        }

        const newChannels = new Map(state.channels);
        const channel = newChannels.get(channelName);

        if (channel) {
          channel.unsubscribe();
          newChannels.delete(channelName);
          newRefCounts.delete(channelName);
          const newSubscriptions = new Map(state.subscriptions);
          newSubscriptions.delete(channelName);
          return {
            channels: newChannels,
            refCounts: newRefCounts,
            subscriptions: newSubscriptions,
          };
        }

        return {};
      });
    },
  })
);

export default useChatSubscriptionStore;
