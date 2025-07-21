'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Styles } from './styles/image-banner.styles';
import './swiper-custom.css';

interface ImageBannerProps {
  images: string[];
  height?: number | string;
  autoplay?: boolean;
}

export const ImageBanner = ({ images, autoplay = false, height = 230 }: ImageBannerProps) => {
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
      {images.map((image) => (
        <SwiperSlide key={image}>
          <div className={Styles.slideContainer}>
            <img src={image} alt={image} className={Styles.image} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
