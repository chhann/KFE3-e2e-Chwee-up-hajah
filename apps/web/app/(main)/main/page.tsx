import { BannerBackground } from '@/widgets/banner-bg/ui/BannerBackGround';
import { EventBanner } from '@/widgets/image-banner';
import { Product } from '@/widgets/product-section/types';

import { fetchProductList } from '@/shared/api/server/product/fetchProductList';
import { formatToYMD, getTimeRemainingUTC } from '@/shared/lib/utils/time';
import { RawProduct } from '@/shared/types/product';

import { ClientMain } from './client';
import { Styles } from './styles/main.styles';

async function getProducts(sort: 'popular' | 'endingSoon', limit?: number): Promise<Product[]> {
  const raw: RawProduct[] = await fetchProductList(sort, limit);
  return raw.map((item) => ({
    id: item.auction_id,
    title: item.product_name,
    category: item.category_name,
    bidCount: item.bid_count,
    endTime: formatToYMD(item.end_time),
    price: item.current_price,
    image: item.thumbnail,
    timeLeft:
      getTimeRemainingUTC(item.end_time)?.total > 0
        ? `${getTimeRemainingUTC(item.end_time).hours} : ${
            getTimeRemainingUTC(item.end_time).minutes
          }`
        : '경매 종료',
  }));
}

const MainHome = async () => {
  const popularProducts = await getProducts('popular', 10);
  const latestProducts = await getProducts('endingSoon');

  return (
    <div>
      <BannerBackground />
      <div className={Styles.bannerContainer}>지금 주목 해볼 핫딜!</div>

      <EventBanner height={318} autoplay={true} />

      <ClientMain initialPopularProducts={popularProducts} initialLatestProducts={latestProducts} />
    </div>
  );
};

export default MainHome;
