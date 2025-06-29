import { supabase } from '@/lib/supabase/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMessageSubscription } from './useMessageSubscription';

// Supabase 클라이언트를 모의합니다.
vi.mock('@/lib/supabase/supabase', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(),
    removeChannel: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMessageSubscription', () => {
  const mockRoomId = 'test-room-id';
  const mockOnInitialMessages = vi.fn();
  const mockOnMessage = vi.fn();

  // Mock 객체들을 전역으로 선언
  let mockSelect: any;
  let mockEq: any;
  let mockOrder: any;
  let mockChannel: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Supabase query 체인 Mock 설정
    mockOrder = vi.fn();
    mockEq = vi.fn(() => ({
      order: mockOrder,
    }));
    mockSelect = vi.fn(() => ({
      eq: mockEq,
    }));

    // Channel Mock 설정
    mockChannel = {
      on: vi.fn(() => mockChannel), // 체이닝을 위해 자기 자신 반환
      subscribe: vi.fn(() => mockChannel), // 채널 객체 자체를 동기적으로 반환
      channelName: `chat-${mockRoomId}`,
    };

    // supabase.from Mock 설정
    (supabase.from as vi.Mock).mockReturnValue({
      select: mockSelect,
    });

    // supabase.channel Mock 설정
    (supabase.channel as vi.Mock).mockReturnValue(mockChannel);
  });

  it('should fetch initial messages and call onInitialMessages', async () => {
    const mockInitialMessages = [
      { id: '1', text: 'Initial message 1', room_id: mockRoomId, sent_at: '2023-01-01' },
    ];

    // order 메서드가 성공적인 응답을 반환하도록 설정
    mockOrder.mockResolvedValue({ data: mockInitialMessages, error: null });

    renderHook(() =>
      useMessageSubscription({
        roomId: mockRoomId,
        onInitialMessages: mockOnInitialMessages,
        onMessage: mockOnMessage,
      })
    );

    // 비동기 작업들이 완료될 때까지 대기
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('message');
    });

    await waitFor(() => {
      expect(mockSelect).toHaveBeenCalledWith('*');
    });

    await waitFor(() => {
      expect(mockEq).toHaveBeenCalledWith('room_id', mockRoomId);
    });

    await waitFor(() => {
      expect(mockOrder).toHaveBeenCalledWith('sent_at', { ascending: true });
    });

    await waitFor(() => {
      expect(mockOnInitialMessages).toHaveBeenCalledWith(mockInitialMessages);
    });
  });

  it('should subscribe to new messages and call onMessage', async () => {
    const mockNewMessage = {
      id: '2',
      text: 'New message',
      room_id: mockRoomId,
      sent_at: '2023-01-02',
    };

    // 초기 메시지 로드를 위한 Mock 설정
    mockOrder.mockResolvedValue({ data: [], error: null });

    let onInsertCallback: any;

    // Channel의 on 메서드가 콜백을 저장하도록 설정
    mockChannel.on.mockImplementation((event: string, options: any, callback: any) => {
      if (event === 'postgres_changes' && options.event === 'INSERT') {
        onInsertCallback = callback;
      }
      return mockChannel;
    });

    renderHook(() =>
      useMessageSubscription({
        roomId: mockRoomId,
        onInitialMessages: mockOnInitialMessages,
        onMessage: mockOnMessage,
      })
    );

    // 구독이 설정될 때까지 대기
    await waitFor(() => {
      expect(supabase.channel).toHaveBeenCalledWith(`chat-${mockRoomId}`);
    });

    await waitFor(() => {
      expect(mockChannel.on).toHaveBeenCalledWith(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
          filter: `room_id=eq.${mockRoomId}`,
        },
        expect.any(Function)
      );
    });

    await waitFor(() => {
      expect(mockChannel.subscribe).toHaveBeenCalled();
    });

    // 새 메시지가 수신되었을 때의 동작 시뮬레이션
    expect(onInsertCallback).toBeDefined();

    act(() => {
      onInsertCallback({ new: mockNewMessage });
    });

    expect(mockOnMessage).toHaveBeenCalledWith(mockNewMessage);
  });

  it('should not call onMessage for messages from different rooms', async () => {
    const mockNewMessage = {
      id: '2',
      text: 'New message',
      room_id: 'different-room-id', // 다른 방의 메시지
      sent_at: '2023-01-02',
    };

    // 초기 메시지 로드를 위한 Mock 설정
    mockOrder.mockResolvedValue({ data: [], error: null });

    let onInsertCallback: any;

    mockChannel.on.mockImplementation((event: string, options: any, callback: any) => {
      if (event === 'postgres_changes' && options.event === 'INSERT') {
        onInsertCallback = callback;
      }
      return mockChannel;
    });

    renderHook(() =>
      useMessageSubscription({
        roomId: mockRoomId,
        onInitialMessages: mockOnInitialMessages,
        onMessage: mockOnMessage,
      })
    );

    // 구독이 설정될 때까지 대기
    await waitFor(() => {
      expect(mockChannel.subscribe).toHaveBeenCalled();
    });

    // 다른 방의 메시지 수신 시뮬레이션
    act(() => {
      onInsertCallback({ new: mockNewMessage });
    });

    // 다른 방의 메시지이므로 onMessage가 호출되지 않아야 함
    expect(mockOnMessage).not.toHaveBeenCalled();
  });

  it('should remove channel on unmount', async () => {
    // 초기 메시지 로드를 위한 Mock 설정
    mockOrder.mockResolvedValue({ data: [], error: null });

    const { unmount } = renderHook(() =>
      useMessageSubscription({
        roomId: mockRoomId,
        onInitialMessages: mockOnInitialMessages,
        onMessage: mockOnMessage,
      })
    );

    // 구독이 설정될 때까지 대기
    await waitFor(() => {
      expect(mockChannel.subscribe).toHaveBeenCalled();
    });

    // 컴포넌트 언마운트
    act(() => {
      unmount();
    });

    // removeChannel이 호출되었는지 확인
    expect(supabase.removeChannel).toHaveBeenCalledWith(mockChannel);
  });

  it('should handle database errors gracefully', async () => {
    // 데이터베이스 에러 시뮬레이션
    mockOrder.mockResolvedValue({
      data: null,
      error: { message: 'Database connection failed' },
    });

    renderHook(() =>
      useMessageSubscription({
        roomId: mockRoomId,
        onInitialMessages: mockOnInitialMessages,
        onMessage: mockOnMessage,
      })
    );

    // 에러가 발생해도 구독은 시작되어야 함
    await waitFor(() => {
      expect(supabase.channel).toHaveBeenCalledWith(`chat-${mockRoomId}`);
    });

    // 에러 상황에서는 onInitialMessages가 호출되지 않아야 함
    expect(mockOnInitialMessages).not.toHaveBeenCalled();
  });
});
