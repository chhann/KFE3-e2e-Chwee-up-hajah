import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatRoomList } from './ChatRoomList';
import * as useChatRoomsModule from '../model/useChatRooms';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('ChatRoomList', () => {
  const mockChatRooms = [
    {
      room_id: '1',
      product_id: 'product-1',
      product_name: 'Chat Room 1',
      buyer_id: 'buyer-1',
      buyer_nickname: 'Buyer1',
      seller_id: 'seller-1',
      seller_nickname: 'Seller1',
      created_at: '2024-06-29T10:00:00Z',
    },
    {
      room_id: '2',
      product_id: 'product-2',
      product_name: 'Chat Room 2',
      buyer_id: 'buyer-2',
      buyer_nickname: 'Buyer2',
      seller_id: 'seller-2',
      seller_nickname: 'Seller2',
      created_at: '2024-06-29T11:00:00Z',
    },
  ];

  it('renders a list of chat room items', async () => {
    vi.spyOn(useChatRoomsModule, 'useChatRooms').mockReturnValue({
      data: mockChatRooms,
      isLoading: false,
      isError: false,
    } as any);

    render(<ChatRoomList currentUserId="buyer-1" />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Chat Room 1')).toBeInTheDocument();
      expect(screen.getByText('Chat Room 2')).toBeInTheDocument();
    });
  });

  it('renders a message when no chat rooms are available', async () => {
    vi.spyOn(useChatRoomsModule, 'useChatRooms').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as any);

    render(<ChatRoomList currentUserId="buyer-1" />, { wrapper });

    await waitFor(() => {
        expect(screen.queryByText('Chat Room 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Chat Room 2')).not.toBeInTheDocument();
    });
  });
});