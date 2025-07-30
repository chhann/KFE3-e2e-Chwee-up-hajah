export type SortOption = 'popular' | 'latest' | 'endingSoon';

export const fetchProductList = async (sort: SortOption, limit?: number) => {
  const url = new URL(`/api/product`, process.env.NEXT_PUBLIC_BASE_URL);
  url.searchParams.append('sort', sort);
  if (limit) {
    url.searchParams.append('limit', limit.toString());
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch product list');
  }

  return res.json();
};
