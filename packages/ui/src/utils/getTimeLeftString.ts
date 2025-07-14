interface TimeLeftProps {
  endDate: Date | string;
  startDate?: Date | string | null;
}

export function getTimeLeftString({ endDate, startDate }: TimeLeftProps): string {
  const now = new Date();

  const parseDate = (date: Date | string | null | undefined): Date | null => {
    if (!date) return null;
    if (date instanceof Date) return date;
    // DB에서 오는 'YYYY-MM-DD HH:MM:SS' 형식의 문자열을 UTC로 해석하도록 처리
    const isoString = date.replace(' ', 'T') + 'Z';
    const parsedDate = new Date(isoString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const formatTime = (diff: number): string => {
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    if (totalHours === 0 && minutes === 0) {
      return '1분 미만';
    }
    return `${totalHours}시간 ${minutes}분`;
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!end) {
    return '유효하지 않은 종료 날짜';
  }

  // 경매 시작 전
  if (start && start.getTime() > now.getTime()) {
    const diff = start.getTime() - now.getTime();
    return `시작까지 ${formatTime(diff)}`;
  }

  // 경매 진행 중 또는 종료
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return '경매 종료';
  }

  return formatTime(diff);
}
