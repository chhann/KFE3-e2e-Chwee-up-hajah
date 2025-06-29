
import { render, screen } from '@testing-library/react';
import { ChatRoomItem } from './ChatRoomItem';
import { BrowserRouter as Router } from 'react-router-dom'; // Assuming react-router-dom for navigation

describe('ChatRoomItem', () => {
  const mockChatRoom = {
    id: '1',
    name: 'Test Chat Room',
    lastMessage: 'Hello there!',
    lastMessageTime: '2024-06-29T10:00:00Z',
  };

  it('renders chat room details correctly', () => {
    render(
      <Router>
        <ChatRoomItem chatRoom={mockChatRoom} />
      </Router>
    );

    expect(screen.getByText('Test Chat Room')).toBeInTheDocument();
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText(/June 29, 2024/i)).toBeInTheDocument(); // Adjust based on actual date formatting
  });

  it('links to the correct chat room page', () => {
    render(
      <Router>
        <ChatRoomItem chatRoom={mockChatRoom} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /Test Chat Room/i });
    expect(linkElement).toHaveAttribute('href', '/chat/1'); // Adjust based on actual routing
  });
});
