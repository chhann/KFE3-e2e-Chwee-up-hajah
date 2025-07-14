'use client';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Product } from '@/widgets/product-section/types';

import { ProductCard } from './ProductCard';
import { Styles } from './styles/product-list.styles';

interface ProductListProps {
  items: Product[];
  direction: 'horizontal' | 'vertical';
}

export const ProductList = ({ items, direction }: ProductListProps) => {
  if (direction === 'horizontal') {
    return (
      <div className={Styles.horizontalContainer}>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          slidesOffsetAfter={0}
          loop={(items?.length ?? 0) > 3}
          className={Styles.swiper}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className={Styles.swiperSlide}>
              <ProductCard item={item} layout="horizontal" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className={Styles.verticalContainer}>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className={Styles.verticalItem}>
            <ProductCard item={item} />
          </div>
        ))
      ) : (
        <p className={Styles.noProducts}>No products available.</p>
      )}
    </div>
  );
};
