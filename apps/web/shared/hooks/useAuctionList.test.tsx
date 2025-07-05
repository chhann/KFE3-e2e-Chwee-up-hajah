import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuctionList } from './useAuctionList';

// fetch API 모의 처리
global.fetch = vi.fn();

const createFetchResponse = (ok: boolean, data: any) => {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  } as Response);
};

describe('useAuctionList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // 테스트에서는 재시도 비활성화
        },
      },
    });
    vi.clearAllMocks();
  });

  it('should fetch auction list successfully', async () => {
    const mockAuctionList = [
      {
        auction_id: '1',
        start_price: 100,
        current_price: 120,
        start_time: '2025-01-01T00:00:00Z',
        end_time: '2025-01-02T00:00:00Z',
        thumbnail: 'thumb1.jpg',
        images: ['img1.jpg'],
        seller_confirm: true,
        buyer_confirm: false,
        bid_count: 5,
        status: 'active',
        badge_variant: null,
        product: { name: 'Product A', category: 'Electronics', description: 'Desc A' },
        seller: { username: 'sellerA', address: 'Addr A' },
      },
    ];

    (fetch as vi.Mock).mockResolvedValue(createFetchResponse(true, mockAuctionList));

    const { result } = renderHook(() => useAuctionList(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    // 데이터 로딩 중
    expect(result.current.isLoading).toBe(true);

    // 데이터 로딩 완료 및 확인
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockAuctionList);
    expect(fetch).toHaveBeenCalledWith('/api/auction/list');
  });

  it('should handle fetch error', async () => {
    (fetch as vi.Mock).mockResolvedValue(createFetchResponse(false, { message: 'Network Error' }));

    const { result } = renderHook(() => useAuctionList(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    // 데이터 로딩 중
    expect(result.current.isLoading).toBe(true);

    // 오류 발생 및 확인
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('경매 목록을 불러오지 못했습니다');
    expect(fetch).toHaveBeenCalledWith('/api/auction/list');
  });
});
