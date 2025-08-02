'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Styles } from './styles/image-banner.styles';

import './styles/swiper-custom.css';

interface ImageBannerProps {
  images: string[];
  height?: number | string;
  autoplay?: boolean;
  altText?: string;
}

export const ImageBanner = ({
  images,
  autoplay = false,
  height = 230,
  altText = '배너 이미지',
}: ImageBannerProps) => {
  return (
    <Swiper
      style={{ height }}
      slidesPerView={1}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
      modules={[Navigation, Pagination, Autoplay]}
      className={Styles.swiperContainer}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image + index}>
          <div className={Styles.slideContainer}>
            <Image
              src={image}
              alt={`${altText} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={Styles.image}
              priority={index === 0} // 첫 번째 이미지만 우선적으로 로드
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
