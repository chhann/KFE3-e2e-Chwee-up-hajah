
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from './ChatInput';
import { vi } from 'vitest';

describe('ChatInput', () => {
  it('renders the input field and send button', () => {
    render(<ChatInput onSendMessage={vi.fn()} />);
    expect(screen.getByPlaceholderText(/Type your message.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('calls onSendMessage with the message content when send button is clicked', () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const input = screen.getByPlaceholderText(/Type your message.../i);
    fireEvent.change(input, { target: { value: 'Hello, chat!' } });
    fireEvent.click(screen.getByRole('button', { name: /Send/i }));

    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello, chat!');
    expect(input).toHaveValue(''); // Input should be cleared after sending
  });

  it('calls onSendMessage with the message content when Enter key is pressed', () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    const input = screen.getByPlaceholderText(/Type your message.../i);
    fireEvent.change(input, { target: { value: 'Hello, chat!' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello, chat!');
    expect(input).toHaveValue(''); // Input should be cleared after sending
  });

  it('does not call onSendMessage if input is empty', () => {
    const mockOnSendMessage = vi.fn();
    render(<ChatInput onSendMessage={mockOnSendMessage} />);

    fireEvent.click(screen.getByRole('button', { name: /Send/i }));
    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });
});
