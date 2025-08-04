'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Styles } from './styles/image-banner.styles';
import './styles/swiper-custom.css';

interface EventBannerProps {
  height?: number | string;
  autoplay?: boolean;
}

export const EventBanner = ({ autoplay = false, height = 230 }: EventBannerProps) => {
  const events = [
    { id: 1, imageUrl: '/hotdealItem1.webp', redirectUrl: '/hotdeal' },
    { id: 2, imageUrl: '/hotdealItem2.webp', redirectUrl: '/hotdeal' },
  ];

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
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <Link href={event.redirectUrl}>
            <div className={Styles.slideContainer}>
              <Image
                src={event.imageUrl}
                alt={`banner-${event.id}`}
                width={343}
                height={318}
                className={Styles.image}
                priority={true} // ✅ LCP 요소로 preload
                loading="eager"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
