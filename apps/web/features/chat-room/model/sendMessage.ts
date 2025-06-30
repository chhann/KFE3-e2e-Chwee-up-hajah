export const sendMessage = async ({
  roomId,
  senderId,
  content,
}: {
  roomId: string;
  senderId: string;
  content: string;
}) => {
  const res = await fetch('/api/message/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, senderId, content }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '메시지 전송 실패');
  }
};
