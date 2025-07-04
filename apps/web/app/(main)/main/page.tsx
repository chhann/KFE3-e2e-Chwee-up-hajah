'use client';

import { Category } from '@repo/ui/design-system/base-components/Category/index';

import { ImageBanner } from '@/widgets/image-banner';
import { ProductSection } from '@/widgets/product-section';
import { SectionHeader } from '@/widgets/product-section-header';

import { useProductList } from '@/hooks/product-list/useProductList';
import { categories } from '@/mock/auction';
import { Styles } from './styles/main.styles';

const Page = () => {
  const { data: popularProducts, isLoading: isPopularLoading } = useProductList('popular');
  const { data: latestProducts, isLoading: isLatestLoading } = useProductList('latest');

  return (
    <div className={Styles.container}>
      {/* 배너 */}
      <ImageBanner
        images={['/mock-image/images.jpg', '/mock-image/images (1).jpg']}
        height={172}
        autoplay={true}
        marginBottom={10}
      />
      {/* 카테고리 */}
      <Category categories={categories} className={Styles.category} />
      {/* 인기순 상품 리스트 */}
      <SectionHeader title="인기순" onClickMore={() => console.log('작동함')} />
      <ProductSection
        products={popularProducts}
        isLoading={isPopularLoading}
        direction="horizontal"
      />
      {/* 지도 */}
      <SectionHeader
        title="내 주변 경매"
        onClickMore={() => console.log('작동함')}
        location="서울 동작구"
        className={Styles.mapSectionHeader}
      />
      <div className={Styles.mapPlaceholder}>지도 영역 (Map Placeholder)</div>
      {/* 최신순 상품 리스트 */}
      <SectionHeader
        title="최신순"
        onClickMore={() => console.log('작동함')}
        className={Styles.latestSectionHeader}
      />
      <ProductSection
        products={latestProducts}
        isLoading={isLatestLoading}
        direction="horizontal"
      />
    </div>
  );
};

export default Page;
