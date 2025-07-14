import { format } from 'date-fns';

/**
 * 메시지 두 개를 비교해 날짜 라벨을 표시할지 판단
 * (이전 메시지와 날짜가 다르면 true)
 */
export const shouldShowDateLabel = (
  currentSentAt: string | Date,
  prevSentAt?: string | Date
): boolean => {
  const currentDate = format(new Date(currentSentAt), 'yyyy-MM-dd');
  const prevDate = prevSentAt ? format(new Date(prevSentAt), 'yyyy-MM-dd') : null;
  return currentDate !== prevDate;
};

/**
 * 채팅 메시지에 표시할 시간 포맷
 * 예: 오전 09:33
 */
export const formatMessageTime = (date: string | Date): string =>
  new Date(date).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Seoul',
  });

/**
 * 날짜 라벨에 표시할 형식
 * 예: 2025 / 07 / 10
 */
export const formatDateLabel = (date: string | Date): string =>
  format(new Date(date), 'yyyy / MM / dd');
