
import { render, screen } from '@testing-library/react';
import { ChatMessages } from './ChatMessages';

describe('ChatMessages', () => {
  const mockMessages = [
    {
      id: '1',
      sender: 'User1',
      content: 'Hello!',
      timestamp: '2024-06-29T10:00:00Z',
    },
    {
      id: '2',
      sender: 'User2',
      content: 'Hi there!',
      timestamp: '2024-06-29T10:01:00Z',
    },
  ];

  it('renders a list of chat messages', () => {
    render(<ChatMessages messages={mockMessages} />);

    expect(screen.getByText('User1: Hello!')).toBeInTheDocument();
    expect(screen.getByText('User2: Hi there!')).toBeInTheDocument();
  });

  it('renders a message when no messages are available', () => {
    render(<ChatMessages messages={[]} />);

    expect(screen.getByText('No messages yet.')).toBeInTheDocument();
  });
});
