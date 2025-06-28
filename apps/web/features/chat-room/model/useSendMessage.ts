// features/chat-room/model/useSendMessage.ts
import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '@/app/api/chat/room/sendMessage';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
