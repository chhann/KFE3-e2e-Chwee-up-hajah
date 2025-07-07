import { useMutation } from '@tanstack/react-query';

export const useMessagesAsRead = () => {
  return useMutation({
    mutationFn: async (messageIds: string[]) => {
      const res = await fetch('/api/message/read', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageIds }),
      });

      if (!res.ok) throw new Error('읽음 처리 실패');
    },
  });
};
