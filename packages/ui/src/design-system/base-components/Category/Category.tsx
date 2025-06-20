'use client';

import { MdLocationPin } from 'react-icons/md';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface CategoryProps {
  categories: { title: string }[];
}
export default function Category({ categories }: CategoryProps) {
  return (
    <Swiper slidesPerView={5} className="max-w-full">
      {categories.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="relative flex h-24 w-24 flex-col items-center justify-center">
            <MdLocationPin className="bg-primary-200 h-14 w-14 rounded-full border object-cover text-gray-500" />
            <span className="absolute bottom-0.5 text-xs">{item.title}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
