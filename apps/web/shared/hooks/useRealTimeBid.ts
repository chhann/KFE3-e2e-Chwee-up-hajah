import { useEffect, useRef } from 'react';

import { supabase } from '../shared/lib/supabase/supabase';
import { Bid } from '../types/db';

export function useRealtimeBids(auctionId: string | undefined, onNewBid: (bid: Bid) => void) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const bidderCache = useRef<Map<string, { username: string }>>(new Map());

  useEffect(() => {
    if (!auctionId) return;

    const fetchUser = async (bidder_id: string) => {
      if (bidderCache.current.has(bidder_id)) {
        return bidderCache.current.get(bidder_id);
      }
      try {
        const res = await fetch(`/api/auction/bidder-name?bidderId=${bidder_id}`);
        if (!res.ok) return undefined;
        const { username } = await res.json();
        const user = { username };
        bidderCache.current.set(bidder_id, user);
        return user;
      } catch {
        return undefined;
      }
    };

    interface PostgresChangesPayload {
      new: Bid;
      [key: string]: unknown;
    }

    const handlePayload = async (payload: PostgresChangesPayload) => {
      const bid = payload.new as Bid;
      if (bid?.auction_id !== auctionId) return;

      const user = bid.bidder_id ? await fetchUser(bid.bidder_id) : undefined;

      onNewBid({ ...bid, user });
    };

    const channel = supabase.channel(`realtime-bids-${auctionId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'bid',
        filter: `auction_id=eq.${auctionId}`, // auctionId 필터도 설정 가능
      },
      handlePayload
    );

    // ✅ subscribe에 콜백을 넣어서 상태 확인
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`[realtime] channel subscribed for auctionId: ${auctionId}`);
      } else {
        console.error(`[realtime] channel subscription error: ${status}`);
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        console.log('[realtime] channel removed');
      }
    };
  }, [auctionId]);
}
