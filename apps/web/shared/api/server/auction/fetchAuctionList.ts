import { AuctionItem } from '@/shared/types/auction';
import { QueryFunction } from '@tanstack/react-query';

export const fetchAuctionList: QueryFunction<AuctionItem[], [_1: string, string]> = async ({
  queryKey,
}) => {
  const [, search] = queryKey;

  const url = search.trim()
    ? `/api/auction/list?search=${encodeURIComponent(search.trim())}`
    : '/api/auction/list';

  const res = await fetch(url);
  if (!res.ok) throw new Error('경매 목록을 불러오지 못했습니다');

  return res.json();
};
