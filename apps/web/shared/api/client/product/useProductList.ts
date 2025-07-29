'use client';

import { useQuery } from '@tanstack/react-query';

import { Product } from '@/widgets/product-section/types';

import { fetchProductList, SortOption } from '@/shared/api/server/product/fetchProductList';
import { formatToYMD, getTimeRemainingUTC } from '@/shared/lib/utils/time';
import { RawProduct } from '@/shared/types/product';

export const useProductList = (sort: SortOption, limit?: number) => {
  return useQuery<Product[]>({
    queryKey: ['productList', sort, limit],
    queryFn: async () => {
      const raw: RawProduct[] = await fetchProductList(sort, limit); // 👈 여기 타입 지정

      const mapped = raw.map((item) => ({
        id: item.auction_id,
        title: item.product_name,
        category: item.category_name,
        bidCount: item.bid_count,
        endTime: formatToYMD(item.end_time), // 한국 시간으로 변환
        price: item.current_price,
        image: item.thumbnail,
        timeLeft:
          getTimeRemainingUTC(item.end_time)?.total > 0
            ? `${getTimeRemainingUTC(item.end_time).hours} : ${getTimeRemainingUTC(item.end_time).minutes}`
            : '경매 종료',
      }));

      return mapped;
    },
    staleTime: 1000 * 60 * 1,
  });
};
