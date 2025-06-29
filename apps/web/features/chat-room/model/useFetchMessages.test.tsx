import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessages } from './useFetchMessages';
import { fetchMessages } from '@/app/api/chat/room/fetchMessages';

// fetchMessages 함수를 모의합니다.
vi.mock('@/app/api/chat/room/fetchMessages', () => ({
  fetchMessages: vi.fn(),
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

describe('useMessages', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수를 초기화합니다.
    vi.clearAllMocks();
  });

  it('should fetch messages successfully', async () => {
    const mockMessages = [
      { id: '1', text: 'Hello', sender: 'user1' },
      { id: '2', text: 'Hi', sender: 'user2' },
    ];
    (fetchMessages as vi.Mock).mockResolvedValue(mockMessages);

    const { result } = renderHook(() => useMessages('room123'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockMessages);
    expect(fetchMessages).toHaveBeenCalledWith('room123');
  });

  it('should handle error when fetching messages fails', async () => {
    const errorMessage = 'Failed to fetch messages';
    (fetchMessages as vi.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMessages('room123'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe(errorMessage);
    expect(fetchMessages).toHaveBeenCalledWith('room123');
  });

  it('should not fetch if roomId is undefined', async () => {
    (fetchMessages as vi.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useMessages(undefined as any), { wrapper: createWrapper() });

    expect(result.current.data).toBeUndefined();
    expect(fetchMessages).not.toHaveBeenCalled();
  });
});
