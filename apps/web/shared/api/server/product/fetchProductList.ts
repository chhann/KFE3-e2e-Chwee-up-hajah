export type SortOption = 'popular' | 'latest' | 'endingSoon';

export const fetchProductList = async (sort: SortOption) => {
  const res = await fetch(`/api/product?sort=${sort}`, { cache: 'no-store' });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch product list');
  }

  return res.json();
};
