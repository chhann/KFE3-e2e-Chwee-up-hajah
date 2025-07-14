export const sendMessage = async ({
  roomId,
  senderId,
  content,
  sent_at,
}: {
  roomId: string;
  senderId: string;
  content: string;
  sent_at: string;
}) => {
  const res = await fetch('/api/chat/message-send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, senderId, content, sent_at }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '메시지 전송 실패');
  }
};
