import { useQuery } from '@tanstack/react-query';

import { getTimeRemaining } from '../../../lib/utils/time';
import { Product } from '../../../widgets/productList/types';
import { fetchProductList, SortOption } from '../api/fetchProductList';

export const useProductList = (sort: SortOption) => {
  return useQuery<Product[]>({
    queryKey: ['productList', sort],
    queryFn: async () => {
      const raw = await fetchProductList(sort);

      const mapped = raw.map((item) => ({
        id: item.auction_id,
        title: item.product_name,
        price: item.current_price,
        image: item.thumbnail,
        distance: '5km', // 추후 위치 계산
        timeLeft:
          getTimeRemaining(item.end_time)?.total > 0
            ? `${getTimeRemaining(item.end_time).hours}시간 ${getTimeRemaining(item.end_time).minutes}분`
            : '경매 종료',
      }));

      return mapped;
    },
    staleTime: 1000 * 60 * 1, // 1분
  });
};
