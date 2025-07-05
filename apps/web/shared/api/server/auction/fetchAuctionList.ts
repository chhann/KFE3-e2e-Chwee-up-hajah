export const fetchAuctionList = async () => {
  const res = await fetch('/api/auction/list');
  if (!res.ok) throw new Error('경매 목록을 불러오지 못했습니다');
  return res.json();
};
