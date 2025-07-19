// UTC 시간 파싱 함수
export const parseUTCDate = (dateString?: string): Date | null => {
  if (!dateString) return null;
  // 'Z'를 붙여 UTC로 해석하도록 함
  const isoString = dateString.includes('T')
    ? dateString + 'Z'
    : dateString.replace(' ', 'T') + 'Z';
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  return date >= todayStart && date < todayEnd;
};
