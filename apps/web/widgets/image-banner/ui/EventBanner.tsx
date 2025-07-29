'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Styles } from './styles/image-banner.styles';
import './styles/swiper-custom.css';

export interface EventProps {
  id: number;
  imageUrl: string;
  redirectUrl: string;
  is_active: boolean;
}

interface EventBannerProps {
  events: EventProps[];
  height?: number | string;
  autoplay?: boolean;
}

export const EventBanner = ({ events, autoplay = false, height = 230 }: EventBannerProps) => {
  return (
    <Swiper
      style={{ height }}
      slidesPerView={1}
      loop={true}
      navigation={false}
      pagination={{ type: 'fraction' }}
      autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
      modules={[Navigation, Pagination, Autoplay]}
      className={Styles.swiperContainer}
    >
      {events
        .filter((event) => event.is_active)
        .map((event) => (
          <SwiperSlide key={event.id}>
            <Link href={event.redirectUrl}>
              <div className={Styles.slideContainer}>
                <img src="/exbanner1.png" alt="banner" className={Styles.image} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
