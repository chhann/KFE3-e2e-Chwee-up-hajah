import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatInput } from './ChatInput';
import * as useSendMessageModule from '../model/useSendMessage';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('ChatInput', () => {
  it('renders the input field and send button', () => {
    render(<ChatInput roomId="room-1" senderId="user-1" />, { wrapper });
    expect(screen.getByPlaceholderText('메시지를 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '전송' })).toBeInTheDocument();
  });

  it('calls mutation with the message content when send button is clicked', async () => {
    const mockMutate = vi.fn();
    vi.spyOn(useSendMessageModule, 'useSendMessage').mockReturnValue({
      mutate: mockMutate,
    } as any);

    render(<ChatInput roomId="room-1" senderId="user-1" />, { wrapper });

    const input = screen.getByPlaceholderText('메시지를 입력하세요');
    fireEvent.change(input, { target: { value: 'Hello, chat!' } });
    fireEvent.click(screen.getByRole('button', { name: '전송' }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { roomId: 'room-1', senderId: 'user-1', content: 'Hello, chat!' },
        { onSuccess: expect.any(Function), onError: expect.any(Function) }
      );
    });
  });

  it('does not call mutation if input is empty', () => {
    const mockMutate = vi.fn();
    vi.spyOn(useSendMessageModule, 'useSendMessage').mockReturnValue({
        mutate: mockMutate,
      } as any);
  
      render(<ChatInput roomId="room-1" senderId="user-1" />, { wrapper });
  
      fireEvent.click(screen.getByRole('button', { name: '전송' }));
  
      expect(mockMutate).not.toHaveBeenCalled();
    });
});