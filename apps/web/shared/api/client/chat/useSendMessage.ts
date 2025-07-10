import { sendMessage } from '@/shared/api/server/chat/sendMessage';
import { MessageWithSender } from '@/shared/types/chat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

type Variables = {
  roomId: string;
  senderId: string;
  content: string;
  sent_at: string;
};

export const useSendMessage = (roomId: string, currentUser: { id: string; name: string }) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Variables, { previousMessages: MessageWithSender[] }>({
    mutationFn: sendMessage,

    // ✅ Optimistic Update 적용
    onMutate: async (variables) => {
      const { content, senderId } = variables;

      await queryClient.cancelQueries({ queryKey: ['messages', roomId] });

      const previousMessages =
        queryClient.getQueryData<MessageWithSender[]>(['messages', roomId]) ?? [];

      const fakeMessage: MessageWithSender = {
        message_id: uuidv4(),
        room_id: roomId,
        sender_id: senderId,
        content,
        sent_at: new Date().toISOString(),
        is_read: false,
        created_at: new Date().toISOString(),

        // UI에 필요한 최소 sender 정보
        sender_name: currentUser.name,
        sender_avatar: null,
        sender_address: null,
        sender_address_detail: null,
        sender_score: null,
      };

      queryClient.setQueryData<MessageWithSender[]>(
        ['messages', roomId],
        [...previousMessages, fakeMessage]
      );

      return { previousMessages };
    },

    onError: (_err, _newMessage, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', roomId], context.previousMessages);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', roomId] });
    },
  });
};
