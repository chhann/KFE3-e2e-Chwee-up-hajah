
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ChatRoomItem } from './ChatRoomItem';
import { vi } from 'vitest';

// next/navigation의 useRouter를 모의(mock)합니다.
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ChatRoomItem', () => {
  const mockChatRoom = {
    room_id: '1',
    product_id: 'product-1',
    product_name: 'Test Chat Room',
    buyer_id: 'buyer-1',
    buyer_nickname: 'Buyer1',
    seller_id: 'seller-1',
    seller_nickname: 'Seller1',
    created_at: '2024-06-29T10:00:00Z',
  };

  it('renders chat room details correctly', () => {
    render(<ChatRoomItem room={mockChatRoom} currentUserId="buyer-1" />);

    expect(screen.getByText('Test Chat Room')).toBeInTheDocument();
    expect(screen.getByText('Seller1')).toBeInTheDocument();
  });

  it('calls router.push with the correct path when clicked', () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<ChatRoomItem room={mockChatRoom} currentUserId="buyer-1" />);

    fireEvent.click(screen.getByRole('listitem'));

    expect(mockPush).toHaveBeenCalledWith('/chat/1');
  });
});
