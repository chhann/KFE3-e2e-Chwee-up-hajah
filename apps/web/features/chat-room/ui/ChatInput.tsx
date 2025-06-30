'use client';

import { useState } from 'react';

import { useSendMessage } from '../../../hooks/chat/useSendMessage';

export const ChatInput = ({ roomId, senderId }: { roomId: string; senderId: string }) => {
  const [message, setMessage] = useState('');
  const mutation = useSendMessage();

  const handleSend = () => {
    if (!message.trim()) return;

    mutation.mutate(
      { roomId, senderId, content: message },
      {
        onSuccess: () => setMessage(''),
        onError: (err) => console.error('메시지 전송 실패:', err),
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 p-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="메시지를 입력하세요"
      />
      <button
        onClick={handleSend}
        disabled={mutation.isPending}
        className="rounded-md bg-purple-500 px-4 py-2 text-sm text-white hover:bg-purple-600 active:bg-purple-700 disabled:bg-gray-300"
      >
        {mutation.isPending ? '전송 중...' : '전송'}
      </button>
    </div>
  );
};
