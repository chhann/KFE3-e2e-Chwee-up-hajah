
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProductList } from './useProductList';
import { fetchProductList } from '../../app/api/product/fetchProductList';
import { getTimeRemaining } from '../../lib/utils/time';

// fetchProductList 모의 처리
vi.mock('../../app/api/product/fetchProductList', () => ({
  fetchProductList: vi.fn(),
}));

// getTimeRemaining 모의 처리
vi.mock('../../lib/utils/time', () => ({
  getTimeRemaining: vi.fn(),
}));

describe('useProductList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // 테스트에서는 재시도 비활성화
          staleTime: Infinity, // 테스트 중 재페칭 방지
        },
      },
    });
    vi.clearAllMocks();
  });

  it('should fetch and transform product list successfully', async () => {
    const mockRawProductList = [
      {
        auction_id: 'auction1',
        product_name: 'Product A',
        current_price: 100,
        thumbnail: 'thumbA.jpg',
        end_time: '2025-07-01T10:00:00Z',
      },
      {
        auction_id: 'auction2',
        product_name: 'Product B',
        current_price: 200,
        thumbnail: 'thumbB.jpg',
        end_time: '2025-07-02T10:00:00Z',
      },
    ];

    (fetchProductList as vi.Mock).mockResolvedValue(mockRawProductList);
    (getTimeRemaining as vi.Mock).mockImplementation((endTime) => {
      if (endTime === '2025-07-01T10:00:00Z') {
        return { total: 3600000, hours: 1, minutes: 0, seconds: 0, isEnded: false };
      } else if (endTime === '2025-07-02T10:00:00Z') {
        return { total: 7200000, hours: 2, minutes: 0, seconds: 0, isEnded: false };
      }
      return { total: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    });

    const { result } = renderHook(() => useProductList('popular'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchProductList).toHaveBeenCalledWith('popular');
    expect(getTimeRemaining).toHaveBeenCalledTimes(mockRawProductList.length * 3);
    expect(result.current.data).toEqual([
      {
        id: 'auction1',
        title: 'Product A',
        price: 100,
        image: 'thumbA.jpg',
        distance: '5km',
        timeLeft: '1시간 0분',
      },
      {
        id: 'auction2',
        title: 'Product B',
        price: 200,
        image: 'thumbB.jpg',
        distance: '5km',
        timeLeft: '2시간 0분',
      },
    ]);
  });

  it('should handle fetchProductList error', async () => {
    (fetchProductList as vi.Mock).mockRejectedValue(new Error('Failed to fetch products'));

    const { result } = renderHook(() => useProductList('latest'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(fetchProductList).toHaveBeenCalledWith('latest');
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Failed to fetch products');
  });

  it('should show "경매 종료" when getTimeRemaining indicates auction ended', async () => {
    const mockRawProductList = [
      {
        auction_id: 'auction3',
        product_name: 'Product C',
        current_price: 300,
        thumbnail: 'thumbC.jpg',
        end_time: '2025-06-01T10:00:00Z', // Past date
      },
    ];

    (fetchProductList as vi.Mock).mockResolvedValue(mockRawProductList);
    (getTimeRemaining as vi.Mock).mockReturnValue({ total: -1000, hours: 0, minutes: 0, seconds: 0, isEnded: true });

    const { result } = renderHook(() => useProductList('endingSoon'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0].timeLeft).toBe('경매 종료');
  });
});
