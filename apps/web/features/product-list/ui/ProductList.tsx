'use client';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Product } from '@/widgets/product-section/types';

import { ProductCard } from './ProductCard';

interface ProductListProps {
  items: Product[];
}

export const ProductList = ({ items }: ProductListProps) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={-70}
      slidesOffsetAfter={0}
      loop={(items?.length ?? 0) > 2}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="h-[211px]">
          <ProductCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
