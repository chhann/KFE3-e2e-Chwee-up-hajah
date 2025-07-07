'use client';

import { useState } from 'react';

import { cn } from '@repo/ui/utils/cn';

import { useSendMessage } from '@/shared/api/client/chat/useSendMessage';
import { buttonStyles, inputContainerStyles, inputStyles } from './styles/ChatInput.styles';

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
    <div className={inputContainerStyles}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputStyles}
        placeholder="메시지를 입력하세요"
      />
      <button
        onClick={handleSend}
        disabled={mutation.isPending}
        className={cn(
          buttonStyles.base,
          buttonStyles.bg,
          buttonStyles.text,
          buttonStyles.hoverBg,
          buttonStyles.activeBg,
          buttonStyles.disabledBg
        )}
      >
        {mutation.isPending ? '전송 중...' : '전송'}
      </button>
    </div>
  );
};
