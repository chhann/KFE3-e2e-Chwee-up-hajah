import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSendMessage } from './useSendMessage';
import { sendMessage } from '@/app/api/chat/room/sendMessage';

// sendMessage 함수를 모의합니다.
vi.mock('@/app/api/chat/room/sendMessage', () => ({
  sendMessage: vi.fn(),
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

describe('useSendMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send a message successfully', async () => {
    const mockMessage = {
      roomId: 'room123',
      senderId: 'user123',
      text: 'Hello, world!',
    };
    (sendMessage as vi.Mock).mockResolvedValue(undefined); // sendMessage는 void를 반환합니다.

    const { result } = renderHook(() => useSendMessage(), { wrapper: createWrapper() });

    result.current.mutate(mockMessage);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(mockMessage);
  });

  it('should handle error when sending message fails', async () => {
    const mockMessage = {
      roomId: 'room123',
      senderId: 'user123',
      text: 'Hello, world!',
    };
    const errorMessage = 'Failed to send message';
    (sendMessage as vi.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSendMessage(), { wrapper: createWrapper() });

    result.current.mutate(mockMessage);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe(errorMessage);
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(mockMessage);
  });
});
