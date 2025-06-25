'use client';

import { Category } from '@repo/ui/design-system/base-components/Category/index';

import { useProductList } from '../../../entities/productList/model/useProductList';
import { categories } from '../../../mock/auction';
import { ImageBanner } from '../../../widgets/image-banner';
import { SectionHeader } from '../../../widgets/product-section-header/ui/SectionHeader';
import { ProductSection } from '../../../widgets/product-section/ui/ProductSection';

export const MainPage = () => {
  const { data: popularProducts, isLoading: isPopularLoading } = useProductList('popular');
  const { data: latestProducts, isLoading: isLatestLoading } = useProductList('latest');

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-1">
      {/* 배너 */}
      <ImageBanner
        images={['images.jpg', 'images (1).jpg']}
        height={172}
        autoplay={true}
        marginBottom={10}
      />
      {/* 카테고리 */}
      <Category categories={categories} className="my-[33px]" />
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
        className="mt-9"
      />
      <div className="mt-2 flex h-[196px] w-full items-center justify-center rounded-[6px] border border-dashed border-gray-400 text-sm text-gray-400">
        지도 영역 (Map Placeholder)
      </div>
      {/* 최신순 상품 리스트 */}
      <SectionHeader
        title="최신순"
        onClickMore={() => console.log('작동함')}
        className="mt-[33px]"
      />
      <ProductSection
        products={latestProducts}
        isLoading={isLatestLoading}
        direction="horizontal"
      />
    </div>
  );
};
