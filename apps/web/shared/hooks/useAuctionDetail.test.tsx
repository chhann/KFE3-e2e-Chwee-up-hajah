import createWrapper from '@/shared/lib/utils/createWrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuctionDetail } from './useAuctionDetail';

describe('useAuctionDetail', () => {
  it('should fetch auction details successfully', async () => {
    const mockAuctionData = {
      id: 1,
      title: 'Test Auction',
      description: 'Test Description',
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockAuctionData }),
    } as Response);

    const wrapper = createWrapper(); // new QueryClient per test

    const { result } = renderHook(() => useAuctionDetail('1'), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockAuctionData);
  });

  it('should handle error when fetching auction details', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    const wrapper = createWrapper(); // 다시 fresh client

    const { result } = renderHook(() => useAuctionDetail('1'), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network Error');
  });
});
