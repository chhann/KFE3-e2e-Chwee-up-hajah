import { QueryFunctionContext } from '@tanstack/react-query';

export type AuctionListQueryKey = ['auction-list', string];
export const fetchAuctionList = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<AuctionListQueryKey, number>) => {
  const [, search] = queryKey;
  const page = pageParam || 1;

  const searchParams = new URLSearchParams();
  if (search.trim()) {
    searchParams.set('search', search.trim());
  }
  searchParams.set('page', page.toString());

  const url = `/api/auction/list?${searchParams.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('경매 목록을 불러오지 못했습니다');

  return res.json();
};
