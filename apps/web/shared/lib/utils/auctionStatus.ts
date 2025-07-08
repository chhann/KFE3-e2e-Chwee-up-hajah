export function getAuctionStatus(item: { start_time?: string; end_time?: string }) {
  let status: 'ready' | 'in progress' | 'end' = 'ready';
  const now = new Date();
  const start = item.start_time ? new Date(item.start_time) : null;
  const end = item.end_time ? new Date(item.end_time) : null;
  if (start && end) {
    if (now < start) status = 'ready';
    else if (now >= start && now <= end) status = 'in progress';
    else if (now > end) status = 'end';
  }
  return status;
}
