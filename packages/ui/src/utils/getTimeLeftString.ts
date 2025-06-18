export function getTimeLeftString(endDate: Date | string): string {
  const now = new Date();
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  let diff = Math.max(0, end.getTime() - now.getTime());

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));

  return `${hours}시간 ${minutes}분`;
}
