export function getAuctionStatus(item: { start_time?: string; end_time?: string }) {
  let status: 'ready' | 'in_progress' | 'closed' = 'ready';
  const now = new Date();

  const parseUTCDate = (dateString?: string): Date | null => {
    if (!dateString) return null;
    // 'Z'를 붙여 UTC로 해석하도록 강제
    const isoString = dateString.includes('T')
      ? dateString + 'Z'
      : dateString.replace(' ', 'T') + 'Z';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

  const start = parseUTCDate(item.start_time);
  const end = parseUTCDate(item.end_time);

  if (start && end) {
    if (now < start) status = 'ready';
    else if (now >= start && now <= end) status = 'in_progress';
    else if (now > end) status = 'closed';
  }
  return status;
}
