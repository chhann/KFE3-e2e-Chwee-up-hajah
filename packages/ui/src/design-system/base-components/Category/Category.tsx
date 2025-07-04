'use client';
import 'swiper/css';

import { MdLocationPin } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CategoryIconStyle,
  CategoryImageStyle,
  CategoryItemStyle,
  CategoryItemTextStyle,
} from './Category.Styles';

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
            <div className={CategoryItemStyle} onClick={() => onCategoryClick?.(item.title)}>
              <div className={CategoryImageStyle}>
                <MdLocationPin className={CategoryIconStyle} />
              </div>
              <span className={CategoryItemTextStyle}>{item.title}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
