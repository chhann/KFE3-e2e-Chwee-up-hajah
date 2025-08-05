'use client';

import { Suspense, useState } from 'react';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import dynamic from 'next/dynamic';

import { SectionHeader } from '@/widgets/product-section-header';
import { Product } from '@/widgets/product-section/types';

import { categories } from '@/shared/mock/auction';

const DynamicProductSection = dynamic(() =>
  import('@/widgets/product-section').then((mod) => mod.ProductSection)
);

const EventPopup = dynamic(
  () => import('@/widgets/events/eventPopup').then((mod) => mod.EventPopup),
  { ssr: false }
);

interface ClientMainProps {
  initialPopularProducts: Product[];
  initialLatestProducts: Product[];
}

export const ClientMain = ({ initialPopularProducts, initialLatestProducts }: ClientMainProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('전체');

  const filteredPopular =
    selectedCategory === '전체'
      ? initialPopularProducts
      : initialPopularProducts?.filter((p) => p.category === selectedCategory);

  const filteredLatest =
    selectedCategory === '전체'
      ? initialLatestProducts
      : initialLatestProducts?.filter((p) => p.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EventPopup />
      </Suspense>
      <Category
        categories={categories}
        className="mt-4"
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* 인기순 상품 리스트 */}
      <SectionHeader
        title="현재 입찰자 많은 경매 TOP10🔥"
        subTitle="입찰자가 많은 순으로 확인해보세요!"
        className="mt-8"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicProductSection products={filteredPopular} isLoading={false} />
      </Suspense>

      {/* 최신순 상품 리스트 */}
      {filteredLatest && filteredLatest.length > 0 && (
        <>
          <SectionHeader title="마감이 임박한 경매 TOP10⏰" className="mt-8" />
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicProductSection products={filteredLatest} isLoading={false} />
          </Suspense>
        </>
      )}
    </>
  );
};
