
import { render, screen } from '@testing-library/react';
import { ChatRoomList } from './ChatRoomList';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ChatRoomList', () => {
  const mockChatRooms = [
    {
      id: '1',
      name: 'Chat Room 1',
      lastMessage: 'Message 1',
      lastMessageTime: '2024-06-29T10:00:00Z',
    },
    {
      id: '2',
      name: 'Chat Room 2',
      lastMessage: 'Message 2',
      lastMessageTime: '2024-06-29T11:00:00Z',
    },
  ];

  it('renders a list of chat room items', () => {
    render(
      <Router>
        <ChatRoomList chatRooms={mockChatRooms} />
      </Router>
    );

    expect(screen.getByText('Chat Room 1')).toBeInTheDocument();
    expect(screen.getByText('Message 1')).toBeInTheDocument();
    expect(screen.getByText('Chat Room 2')).toBeInTheDocument();
    expect(screen.getByText('Message 2')).toBeInTheDocument();
  });

  it('renders a message when no chat rooms are available', () => {
    render(
      <Router>
        <ChatRoomList chatRooms={[]} />
      </Router>
    );

    expect(screen.getByText('No chat rooms available.')).toBeInTheDocument();
  });
});
