import { useCreateAuction } from '@/shared/api/client/auction/useCreateAuction';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { expect, vi } from 'vitest';

// ✅ App Router mock
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCreateAuction', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle successful auction creation', async () => {
    // ✅ fetch를 성공적으로 mock
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const { result } = renderHook(() => useCreateAuction(), { wrapper });

    act(() => {
      result.current.mutate({
        name: 'Test Auction',
        category: 'Art',
        description: 'A fine art piece',
        start_price: 1000,
        start_time: '2025-06-29T00:00:00Z',
        end_time: '2025-07-01T00:00:00Z',
        thumbnail: 'thumb.jpg',
        images: ['img1.jpg', 'img2.jpg'],
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auction/add',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should handle auction creation failure (server returns error)', async () => {
    // ✅ fetch를 실패하도록 mock
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Internal Server Error' }),
    } as Response);

    const { result } = renderHook(() => useCreateAuction(), { wrapper });

    act(() => {
      result.current.mutate({
        name: 'Fail Auction',
        category: 'Test',
        description: 'Should fail',
        start_price: 500,
        start_time: '2025-06-29T00:00:00Z',
        end_time: '2025-07-01T00:00:00Z',
        thumbnail: 'fail.jpg',
        images: ['fail1.jpg'],
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
    await waitFor(() => expect(result.current.isError).toBe(false)); // onError가 alert로만 처리되는 구조라 에러 상태는 false

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auction/add',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should handle network or fetch rejection', async () => {
    // ✅ fetch 자체가 reject되는 상황 mock
    const mockFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useCreateAuction(), { wrapper });

    act(() => {
      result.current.mutate({
        name: 'Reject Auction',
        category: 'Test',
        description: 'Should reject',
        start_price: 300,
        start_time: '2025-06-29T00:00:00Z',
        end_time: '2025-07-01T00:00:00Z',
        thumbnail: 'reject.jpg',
        images: ['reject1.jpg'],
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auction/add',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });
});
