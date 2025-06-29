// ChatMessages.test.tsx
import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatMessages } from './ChatMessages';

import { Message } from '@/app/api/chat/types';
import * as useMessagesModule from '../model/useFetchMessages';
import * as useSubscriptionModule from '../model/useMessageSubscription';

vi.mock('@/lib/supabase/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        in: () => ({
          data: [
            { user_id: 'user1', nickname: 'User1', avatar: null },
            { user_id: 'user2', nickname: 'User2', avatar: null },
          ],
        }),
      }),
    }),
  },
}));

beforeEach(() => {
  vi.restoreAllMocks(); // 테스트 간 상태 초기화
});

const mockMessages: Message[] = [
  {
    message_id: '1',
    sender_id: 'user1',
    content: 'Hello!',
    sent_at: '2024-06-29T10:00:00Z',
    room_id: 'room-1',
    is_read: true,
    created_at: '2024-06-29T10:00:00Z',
  },
  {
    message_id: '2',
    sender_id: 'user2',
    content: 'Hi there!',
    sent_at: '2024-06-29T10:01:00Z',
    room_id: 'room-1',
    is_read: true,
    created_at: '2024-06-29T10:01:00Z',
  },
];

describe('ChatMessages', () => {
  const mockSuccessQueryResult = (
    data: Message[],
  ): UseQueryResult<Message[], Error> => ({
    data,
    error: null,
    isError: false,
    isPending: false,
    isLoading: false,
    isSuccess: true,
    status: 'success',
    fetchStatus: 'idle',
    isRefetching: false,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: false,
    isPlaceholderData: false,
    isStale: true,
    refetch: vi.fn(),
  });

  it('renders messages with users', async () => {
    vi.spyOn(useMessagesModule, 'useMessages').mockReturnValue(
      mockSuccessQueryResult(mockMessages),
    );
    vi.spyOn(
      useSubscriptionModule,
      'useMessageSubscription',
    ).mockImplementation(() => {});

    render(<ChatMessages roomId="room-1" currentUserId="user1" />);

    await waitFor(() => {
      expect(screen.getByText('Hello!')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    // 시간 표시 확인
    // 시간 표시 확인
    expect(screen.getAllByText(/오후 07:0[01]/)).toHaveLength(2);
  });

  it('renders "No messages yet." when data is empty', async () => {
    vi.spyOn(useMessagesModule, 'useMessages').mockReturnValue(
      mockSuccessQueryResult([]),
    );
    vi.spyOn(
      useSubscriptionModule,
      'useMessageSubscription',
    ).mockImplementation(() => {});

    render(<ChatMessages roomId="room-2" currentUserId="user1" />);

    await waitFor(() => {
      expect(screen.getByText('No messages yet.')).toBeInTheDocument();
    });
  });
});
