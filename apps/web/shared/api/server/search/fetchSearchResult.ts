import { AuctionDetail } from '@/shared/types/db';
import { QueryFunction } from '@tanstack/react-query';

export const fetchSearchResult: QueryFunction<
  AuctionDetail[],
  [_1: string, _2: string, SearchParams: { q: string; f?: string }]
> = async ({ queryKey }) => {
  try {
    const [_1, _2, searchParams] = queryKey;

    const response = await fetch(
      `/api/auction/auction-list?search=${searchParams.q}&${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('[getSearch] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while fetching search data');
  }
};
