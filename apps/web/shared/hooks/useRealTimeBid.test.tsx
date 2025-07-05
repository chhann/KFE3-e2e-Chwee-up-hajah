import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useRealtimeBids } from './useRealTimeBid'; // <-- 당신의 훅 위치에 따라 조정

// ✅ 1. 모듈 최상단에서 mocking
vi.mock('../lib/supabase/supabase', () => {
  const mockOn = vi.fn().mockReturnThis();
  const mockSubscribe = vi.fn();
  const mockRemoveChannel = vi.fn();

  return {
    supabase: {
      channel: vi.fn(() => ({
        on: mockOn,
        subscribe: mockSubscribe,
      })),
      removeChannel: mockRemoveChannel,
    },
  };
});

describe('useRealtimeBids', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should subscribe to real-time bid updates', async () => {
    const onNewBid = vi.fn();

    // ✅ 2. 훅 실행
    renderHook(() => useRealtimeBids('1', onNewBid), { wrapper });

    const { supabase } = await import('../shared/lib/supabase/supabase'); // <-- 모킹된 모듈 가져오기

    await waitFor(() => {
      expect(supabase.channel).toHaveBeenCalledWith('realtime-bids-1');
      expect(supabase.channel('1').on).toHaveBeenCalledWith(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bid',
          filter: 'auction_id=eq.1',
        },
        expect.any(Function)
      );
      expect(supabase.channel('1').subscribe).toHaveBeenCalled();
    });
  });
});
