// features/chat-room/model/useSendMessage.ts
import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '@/shared/api/server/chat/sendMessage';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
