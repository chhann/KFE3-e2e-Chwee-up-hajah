'use client';

import { useQuery } from '@tanstack/react-query';

import { Product } from '@/widgets/product-section/types';

import { fetchProductList, SortOption } from '@/shared/api/server/product/fetchProductList';

import { getTimeRemainingUTC } from '@/shared/lib/utils/time';
import { RawProduct } from '@/shared/types/product';

export const useProductList = (sort: SortOption) => {
  return useQuery<Product[]>({
    queryKey: ['productList', sort],
    queryFn: async () => {
      const raw: RawProduct[] = await fetchProductList(sort); // 👈 여기 타입 지정
      console.log('Fetched products:', typeof raw[0]?.end_time);

      const mapped = raw.map((item) => ({
        id: item.auction_id,
        title: item.product_name,
        category: item.category_name,
        price: item.current_price,
        image: item.thumbnail,
        distance: '5km', // TODO: 위치 계산 추가 예정
        timeLeft:
          getTimeRemainingUTC(item.end_time)?.total > 0
            ? `${getTimeRemainingUTC(item.end_time).hours}시간 ${getTimeRemainingUTC(item.end_time).minutes}분`
            : '경매 종료',
      }));

      return mapped;
    },
    staleTime: 1000 * 60 * 1,
  });
};
