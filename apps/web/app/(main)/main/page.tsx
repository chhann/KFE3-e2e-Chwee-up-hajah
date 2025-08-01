'use client';

import { useEffect, useState } from 'react';

import { Category } from '@repo/ui/design-system/base-components/Category/index';
import { useRouter } from 'next/navigation';

import { BannerBackground } from '@/widgets/banner-bg/ui/BannerBackGround';
import { EventPopup } from '@/widgets/events/eventPopup';
import { EventBanner } from '@/widgets/image-banner';
import { ProductSection } from '@/widgets/product-section';
import { SectionHeader } from '@/widgets/product-section-header';

import { useProductList } from '@/shared/api/client/product/useProductList';
import { categories } from '@/shared/mock/auction';
import { Event } from '@/shared/types/events';

import { Styles } from './styles/main.styles';

const MainHome = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>('전체'); // ✅ 선택된 카테고리 상태

  const { data: popularProducts, isLoading: isPopularLoading } = useProductList('popular', 10);
  const { data: latestProducts, isLoading: isLatestLoading } = useProductList('endingSoon');

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
        setIsEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <BannerBackground />
      <EventPopup />
      <div className={Styles.bannerContainer}>지금 주목 해볼 핫딜!</div>

      <EventBanner events={events} height={230} autoplay={true} />

      {/* 카테고리 */}
      <Category
        categories={categories}
        className="mt-4"
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      {/* 인기순 상품 리스트 헤더*/}
      <SectionHeader
        title="현재 입찰자 많은 경매 TOP10🔥"
        subTitle="입찰자가 많은 순으로 확인해보세요!"
        className="mt-8"
      />
      {/* 입찰가 많은 순 경매 리스트 */}
      <ProductSection products={filteredPopular} isLoading={isPopularLoading} />
      {/* 최신순 상품 리스트 */}
      <SectionHeader title="마감이 임박한 경매 TOP10⏰" className="mt-8" />
      <ProductSection products={filteredLatest} isLoading={isLatestLoading} />
    </div>
  );
};

export default MainHome;
