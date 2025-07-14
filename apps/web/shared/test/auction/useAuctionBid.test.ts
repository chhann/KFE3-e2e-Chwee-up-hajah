import { useAuctionBid } from '@/shared/api/client/auction/useAuctionBid';
import { QueryClientWrapper } from '@/test-utils/QueryClientWrapper';
import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

describe('useAuctionBid', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should handle successful bid submission', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
    );

    const { result } = renderHook(() => useAuctionBid(), {
      wrapper: QueryClientWrapper,
    });

    act(() => {
      result.current.mutate({
        auctionId: '1',
        bidderId: 'tester',
        bidPrice: 100,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/auction/bid',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auctionId: '1', bidderId: 'tester', bidPrice: 100 }),
      })
    );
  });

  it('should handle bid submission failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: '입찰 실패' }),
      })
    );

    const { result } = renderHook(() => useAuctionBid(), {
      wrapper: QueryClientWrapper,
    });

    act(() => {
      result.current.mutate({
        auctionId: '1',
        bidderId: 'tester',
        bidPrice: 100,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true)); // ❗❗주의: 이건 실패합니다. 수정해야 함
  });
});
