'use client';

import { Category } from '@repo/ui/design-system/base-components/Category/index';

import { Event } from '@/shared/types/events';
import { EventBanner } from '@/widgets/image-banner';
import { ProductSection } from '@/widgets/product-section';
import { SectionHeader } from '@/widgets/product-section-header';

import { useProductList } from '@/shared/api/client/product/useProductList';
import { categories } from '@/shared/mock/auction';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { Styles } from './styles/main.styles';

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>('전체'); // ✅ 선택된 카테고리 상태

  const { data: popularProducts, isLoading: isPopularLoading } = useProductList('popular');
  const { data: latestProducts, isLoading: isLatestLoading } = useProductList('latest');

  const filteredPopular =
    selectedCategory === '전체'
      ? popularProducts
      : popularProducts?.filter((p) => p.category === selectedCategory);

  const filteredLatest =
    selectedCategory === '전체'
      ? latestProducts
      : latestProducts?.filter((p) => p.category === selectedCategory);

  const router = useRouter();

  // ✅ 클릭 시 로직
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('이벤트 목록을 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        // 데이터 요청이 성공하든 실패하든 로딩 상태를 false로 변경
        setIsEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  return (
    <div className={Styles.container}>
      {/* 배너 */}
      <EventBanner events={events} height={172} autoplay={true} />
      {/* 카테고리 */}
      <Category
        categories={categories}
        className={Styles.category}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      {/* 인기순 상품 리스트 */}
      <SectionHeader title="인기순" onClickMore={() => router.push(`/auction/auction-list`)} />
      <ProductSection
        products={filteredPopular}
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
        onClickMore={() => router.push(`/auction/auction-list`)}
        className={Styles.latestSectionHeader}
      />
      <ProductSection
        products={filteredLatest}
        isLoading={isLatestLoading}
        direction="horizontal"
      />
    </div>
  );
};

export default MainHome;
