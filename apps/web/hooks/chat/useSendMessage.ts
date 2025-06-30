// features/chat-room/model/useSendMessage.ts
import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '@/features/chat-room/model/sendMessage';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
