import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChatRooms } from './useChatRooms';
import { fetchChatRooms } from '../../../app/api/chat/list/fetchChatRooms';

// fetchChatRooms 함수를 모의합니다.
vi.mock('../../../app/api/chat/list/fetchChatRooms', () => ({
  fetchChatRooms: vi.fn(),
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

describe('useChatRooms', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수를 초기화합니다.
    vi.clearAllMocks();
  });

  it('should fetch chat rooms successfully', async () => {
    const mockChatRooms = [
      { id: '1', name: 'Room 1' },
      { id: '2', name: 'Room 2' },
    ];
    (fetchChatRooms as vi.Mock).mockResolvedValue(mockChatRooms);

    const { result } = renderHook(() => useChatRooms('user123'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockChatRooms);
    expect(fetchChatRooms).toHaveBeenCalledWith('user123');
  });

  it('should handle error when fetching chat rooms fails', async () => {
    const errorMessage = 'Failed to fetch chat rooms';
    (fetchChatRooms as vi.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useChatRooms('user123'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe(errorMessage);
    expect(fetchChatRooms).toHaveBeenCalledWith('user123');
  });

  it('should not fetch if userId is undefined', async () => {
    (fetchChatRooms as vi.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useChatRooms(undefined as any), { wrapper: createWrapper() });

    expect(result.current.data).toBeUndefined();
    expect(fetchChatRooms).not.toHaveBeenCalled();
  });
});
