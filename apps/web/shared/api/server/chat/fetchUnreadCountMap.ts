export const fetchUnreadCountMap = async (): Promise<Record<string, number>> => {
  const res = await fetch('/api/chat/unread-count');
  if (!res.ok) {
    const { error } = await res.json();
    console.error('[fetchUnreadCountMap] API error:', error);
    throw new Error('전체 읽지 않은 메시지 수를 불러오는 데 실패했습니다');
  }

  return res.json();
};
