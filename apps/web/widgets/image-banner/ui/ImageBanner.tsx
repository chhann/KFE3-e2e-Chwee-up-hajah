import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper-custom.css';

interface ImageBannerProps {
  images: string[];
  height?: number | string;
  autoplay?: boolean;
  marginBottom?: number | string;
}

export const ImageBanner = ({
  images,
  marginBottom,
  autoplay = false,
  height = 230,
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
      className="bg-neutral-40 w-full rounded-md border-none"
    >
      {images.map((file) => (
        <SwiperSlide key={file}>
          <div className={`flex w-full items-center justify-center`}>
            <img
              src={`/mock-image/${file}`}
              alt={file}
              className="h-auto w-full max-w-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
