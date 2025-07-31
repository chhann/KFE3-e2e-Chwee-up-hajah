interface TimeLeftProps {
  endDate: Date | string;
  startDate?: Date | string | null;
  showSeconds?: boolean;
}

export function getTimeLeftString({
  endDate,
  startDate,
  showSeconds = true,
}: TimeLeftProps): string {
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
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (showSeconds) {
      if (totalHours > 0) {
        return `${pad(totalHours)}:${pad(minutes)}:${pad(seconds)}`;
      }
      return `${pad(minutes)}:${pad(seconds)}`;
    }

    if (totalHours > 0) {
      return `${pad(totalHours)}시간 ${pad(minutes)}분`;
    }
    if (minutes === 0) {
      return '1분 미만';
    }
    return `${pad(minutes)}분`;
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!end) {
    return '유효하지 않은 종료 날짜';
  }

  // 경매 진행 중 또는 종료
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return '00:00';
  }

  return formatTime(diff);
}
