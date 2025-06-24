import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper-custom.css';

interface ImageBannerProps {
  images: string[];
  height?: number | string;
}

export const ImageBanner = ({ images, height = 230 }: ImageBannerProps) => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="bg-neutral-40 w-full rounded-md border-none"
    >
      {images.map((file) => (
        <SwiperSlide key={file}>
          <div className={`flex w-full items-center justify-center h-[${height}px]`}>
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
