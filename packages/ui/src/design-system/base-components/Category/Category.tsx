'use client';
import 'swiper/css';

import { MdLocationPin } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface CategoryProps {
  categories: { title: string }[];
  className?: string;
  onCategoryClick?: (cat: string) => void;
}

export default function Category({ categories, className, onCategoryClick }: CategoryProps) {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <Swiper
        slidesPerView={5}
        spaceBetween={10} // 자연스러운 간격
        slidesOffsetAfter={0} // 마지막 오른쪽 여백 제거
        centeredSlides={false}
        className="w-full"
      >
        {categories.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="flex w-[58px] cursor-pointer flex-col items-center justify-center text-center"
              onClick={() => onCategoryClick?.(item.title)}
            >
              <div className="border-primary-200 bg-primary-50 flex h-[58px] w-[58px] items-center justify-center rounded-full border-2">
                <MdLocationPin className="h-6 w-6 text-gray-500" />
              </div>
              <span className="mt-1 text-xs leading-tight">{item.title}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
