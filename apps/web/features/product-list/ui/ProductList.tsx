'use client';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Product } from '@/widgets/product-section/types';

import { ProductCard } from './ProductCard';

interface ProductListProps {
  items: Product[];
  direction: 'horizontal' | 'vertical';
}

export const ProductList = ({ items, direction }: ProductListProps) => {
  if (direction === 'horizontal') {
    return (
      <div className="w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          slidesOffsetAfter={0}
          loop={(items?.length ?? 0) > 3}
          className="shadow-[5px_5px_10px_rgba(0,0,0,0.08)]"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="h-[211px]">
              <ProductCard item={item} layout="horizontal" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="w-full">
            <ProductCard item={item} />
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};
