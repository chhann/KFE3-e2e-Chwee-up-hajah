import { useAuctionBidState } from '@/features/auction-detail/model/useAuctionBidState';
import * as useBidCostHandlers from '@/features/auction-detail/model/useBidCostHandlers';
import * as useSendBid from '@/features/auction-detail/model/useSendBid';
import { useAuctionBid } from '@/shared/api/client/auction/useAuctionBid';
import * as useAuctionDetail from '@/shared/api/client/auction/useAuctionDetail';
import * as fetchBidderNameModule from '@/shared/api/server/auction/fetchBidderName';
import * as useRealtimeBids from '@/shared/hooks/useRealTimeBid';
import * as supabaseModule from '@/shared/lib/supabase/supabase';
import * as useAuthStore from '@/shared/stores/auth';
import { AuctionDetail, Bid } from '@/shared/types/db';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

// Mock dependencies
vi.mock('@/shared/api/client/auction/useAuctionDetail');
vi.mock('@/shared/api/client/auction/useAuctionBid');
vi.mock('@/shared/stores/auth');
vi.mock('@/shared/api/client/auction/useRealTimeBid');
vi.mock('@/features/auction-detail/model/useBidCostHandlers');
vi.mock('@/features/auction-detail/model/useSendBid');
vi.mock('@/shared/lib/supabase/supabase', () => ({
  supabase: {
    channel: vi.fn(),
    removeChannel: vi.fn(),
  },
}));
vi.mock('@/shared/api/server/auction/fetchBidderName');

const mockAuctionDetailData: AuctionDetail = {
  auction_id: 'test-auction',
  product_id: 'test-product',
  seller_id: 'test-seller',
  start_time: new Date().toISOString(),
  end_time: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  start_price: 5000,
  current_price: 10000,
  bid_count: 0,
  status: 'in progress',
  seller_confirm: false,
  buyer_confirm: false,
  thumbnail: 'test-thumbnail.jpg',
  images: ['test-image.jpg'],
  created_at: new Date().toISOString(),
  badge_variant: null,
  product: {
    name: '테스트 상품',
    category: '기타',
    created_at: new Date().toISOString(),
    product_id: 'test-product',
    description: '테스트 상품 설명',
  },
  seller: {
    address: '테스트 주소',
    username: '테스트 판매자',
    avatar: 'test-avatar.jpg',
    score: 100,
    selling_auction: [],
  },
  bids: [],
};

const mockAuctionDetail = {
  data: mockAuctionDetailData,
  isLoading: false,
  error: null,
  isError: false,
  isPending: false,
  isSuccess: true,
  isFetched: true,
  isFetching: false,
  isRefetching: false,
  isStale: false,
  status: 'success',
  fetchStatus: 'idle',
  refetch: vi.fn(),
};

const mockMinusBidCost = vi.fn();
const mockPlusBidCost = vi.fn();
const mockSendBid = vi.fn();
const mockMutate = vi.fn();

describe('useAuctionBidState', () => {
  let simulateRealtimeBid: (newBid: Bid) => void;
  let mockChannelSubscribeCallback: Mock;
  const mockRemoveChannel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockChannelSubscribeCallback = vi.fn();

    vi.mocked(useAuctionDetail).useAuctionDetail.mockReturnValue(mockAuctionDetail as any);
    vi.mocked(useAuctionBid).mockReturnValue({ mutate: mockMutate } as any);
    vi.mocked(useAuthStore).useAuthStore.mockReturnValue({ userId: 'test-user-id' });

    // Mock useRealtimeBids to capture the onNewBid callback and mock Supabase channel behavior
    vi.mocked(useRealtimeBids).useRealtimeBids.mockImplementation((auctionId, onNewBid) => {
      simulateRealtimeBid = onNewBid;
      useEffect(() => {
        // Simulate channel subscription
        mockChannelSubscribeCallback('SUBSCRIBED');
        return () => {
          // Simulate channel removal
          mockRemoveChannel();
        };
      }, [auctionId]);
    });

    vi.mocked(useBidCostHandlers).useBidCostHandlers.mockReturnValue({
      minusBidCost: mockMinusBidCost,
      plusBidCost: mockPlusBidCost,
    });
    vi.mocked(useSendBid).useSendBid.mockReturnValue(mockSendBid);

    // Mock Supabase client
    const mockOn = vi.fn().mockReturnThis();
    const mockSubscribe = vi.fn((callback) => {
      mockChannelSubscribeCallback = callback;
      return { unsubscribe: vi.fn() };
    });
    const mockChannel = {
      on: mockOn,
      subscribe: mockSubscribe,
    };

    (vi.mocked(supabaseModule).supabase.channel as Mock).mockReturnValue(mockChannel as any);
    (vi.mocked(supabaseModule).supabase.removeChannel as Mock).mockImplementation(
      mockRemoveChannel
    );

    // Mock fetchBidderName
    vi.mocked(fetchBidderNameModule).fetchBidderName.mockResolvedValue({ username: 'mockUser' });
  });

  it('초기 상태를 올바르게 설정해야 한다', () => {
    const { result } = renderHook(() => useAuctionBidState('test-auction'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.displayCurrentPrice).toBe(10000);
    expect(result.current.displayBids).toEqual([]);
    expect(result.current.minBidCostNumber).toBe(15000); // current_price (10000) + bidUnit (5000)
  });

  it('입찰가 조절 함수가 올바르게 동작해야 한다 (+/- 버튼)', async () => {
    const { result } = renderHook(() => useAuctionBidState('test-auction'));

    // minusBidCost 호출 시
    act(() => {
      result.current.minusBidCost();
    });
    expect(mockMinusBidCost).toHaveBeenCalled();

    // plusBidCost 호출 시
    act(() => {
      result.current.plusBidCost();
    });
    expect(mockPlusBidCost).toHaveBeenCalled();
  });

  it('입찰 전송 함수가 문제없이 동작해야 한다', async () => {
    const { result } = renderHook(() => useAuctionBidState('test-auction'));

    act(() => {
      result.current.sendBid();
    });

    expect(mockSendBid).toHaveBeenCalled();
  });

  it('실시간 입찰을 수신하면 상태를 업데이트해야 한다', async () => {
    const { result } = renderHook(() => useAuctionBidState('test-auction'));

    const newBid: Bid = {
      bid_id: 'bid2',
      auction_id: 'test-auction',
      bidder_id: 'user2',
      user: { username: 'user2_name' },
      bid_price: 15000,
      bid_time: new Date().toISOString(),
    };

    act(() => {
      simulateRealtimeBid(newBid);
    });

    await waitFor(() => {
      expect(result.current.displayBids).toEqual([newBid]);
      expect(result.current.displayCurrentPrice).toBe(15000);
      expect(result.current.minBidCostNumber).toBe(20000); // 새로운 current_price (15000) + bidUnit (5000)
    });
  });

  it('Supabase Realtime이 올바르게 동작하여 웹소켓이 닫히지 않아야 한다', async () => {
    const { unmount } = renderHook(() => useAuctionBidState('test-auction'));

    // 컴포넌트 언마운트 시 채널이 제거되는지 확인
    unmount();

    // useRealtimeBids 훅의 cleanup 함수가 호출되었는지 확인
    expect(mockRemoveChannel).toHaveBeenCalledTimes(1);
  });
});
