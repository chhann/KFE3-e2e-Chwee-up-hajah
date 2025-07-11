export function isAuctionStarted(startTime: Date | string): boolean {
  const start =
    typeof startTime === 'string' ? new Date(startTime.replace(' ', 'T') + 'Z') : startTime;
  return start.getTime() <= Date.now();
}
