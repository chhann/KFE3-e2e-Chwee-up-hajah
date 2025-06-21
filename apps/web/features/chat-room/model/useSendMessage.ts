// features/chat-room/model/useSendMessage.ts
import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '../../../entities/chat/api/sendMessage';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
