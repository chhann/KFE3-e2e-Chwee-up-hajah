import { createClient } from '@/app/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// payload 타입 정의
interface RealtimePayload {
  eventType: 'UPDATE';
  schema: 'public';
  table: 'hot_deals';
  commit_timestamp: string;
  old: Record<string, any>; // 업데이트 전 데이터 (primary key만 포함될 수 있음)
  new: Record<string, any>; // 업데이트 후 데이터
}

export const useHotdealRealtime = (hotdealId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`hotdeal_detail_${hotdealId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'hot_deals',
          filter: `id=eq.${hotdealId}`,
        },
        (payload: RealtimePayload) => {
          // payload에 타입 적용
          console.log('Realtime update received for hotdeal:', payload);
          // hotdealDetail 쿼리 무효화하여 최신 데이터 다시 가져오기
          queryClient.invalidateQueries({ queryKey: ['hotdealDetail', hotdealId] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [hotdealId, queryClient]);
};
