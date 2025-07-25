'use client';

import { cn } from '@repo/ui/utils/cn';
import { useState } from 'react';

import { useSendMessage } from '@/shared/api/client/chat/useSendMessage';
import { buttonStyles, inputContainerStyles, inputStyles } from '../styles/ChatInput.styles';

export const ChatInput = ({
  roomId,
  senderId,
  senderName,
}: {
  roomId: string;
  senderId: string;
  senderName: string;
}) => {
  const [input, setInput] = useState('');

  // ✅ senderName까지 넘겨서 useSendMessage 훅에서 optimistic 처리
  const { mutate, isPending } = useSendMessage(roomId, { id: senderId, name: senderName });

  const handleSend = () => {
    console.log('실행됐잖어');

    if (!input.trim()) return;

    mutate({
      roomId,
      senderId,
      content: input,
      sent_at: new Date().toISOString(),
    });
    setInput('');
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputStyles}
        placeholder="메시지를 입력하세요"
      />
      <button
        onClick={handleSend}
        disabled={isPending}
        className={cn(
          'w-[60px]',
          buttonStyles.base,
          isPending ? 'cursor-not-allowed bg-gray-400' : buttonStyles.bg,
          buttonStyles.text,
          !isPending && buttonStyles.hoverBg,
          !isPending && buttonStyles.activeBg,
          isPending && 'opacity-70'
        )}
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
        ) : (
          '전송'
        )}
      </button>
    </div>
  );
};
