import { getGradeIcon } from '@/shared/lib/points/getGradeIcon';
import { HotDeal } from '@/shared/types/db';
import { ProgressBar } from '@/widgets/progress-bar';
import { HotdealInfoCardStyles } from './HotdealInfoCard.styles';

interface HotdealInfoCardProps {
  data: HotDeal;
  countdown: {
    hours: string; // hours 추가
    minutes: string;
    seconds: string;
    message: string;
    isTimeUp: boolean;
  };
}

export const HotdealInfoCard = ({ data, countdown }: HotdealInfoCardProps) => {
  // ProgressBar 및 가격 표시에 사용할 데이터 계산
  const discount = data.start_price - data.current_price;
  const totalDiscount = data.start_price - data.min_price;
  const progressPercent = totalDiscount > 0 ? (discount / totalDiscount) * 100 : 0;
  const discountPercent = data.start_price > 0 ? (discount / data.start_price) * 100 : 0;

  const progressData = {
    startPrice: data.start_price,
    finalPrice: data.min_price,
    currentPrice: data.current_price,
    discount,
    totalDiscount,
    progressPercent,
  };
  return (
    <div>
      <div className={HotdealInfoCardStyles.infoContainerStyle}>
        <img src={data.image_url} alt={data.name} />
        <div className={HotdealInfoCardStyles.infoCardContainerStyle}>
          <div className={HotdealInfoCardStyles.infoNameStyle}>{data.name}</div>

          <div className={HotdealInfoCardStyles.infoPriceNTimeWrapper}>
            <div>
              <div className={HotdealInfoCardStyles.startPriceStyle}>
                {data.start_price.toLocaleString()}원
              </div>
              <div className={HotdealInfoCardStyles.currentPriceWrapperStyle}>
                <div className={HotdealInfoCardStyles.discountPercentStyle}>
                  {parseFloat(discountPercent.toFixed(2))}%
                </div>
                <div className={HotdealInfoCardStyles.currentPriceStyle}>
                  {data.current_price.toLocaleString()}원
                </div>
              </div>
            </div>
            <div className={HotdealInfoCardStyles.countdownContainerStyle}>
              <div>{countdown.message}</div>
              <div className={HotdealInfoCardStyles.countdownStyle}>
                {countdown.hours !== '00'
                  ? `${countdown.hours}:${countdown.minutes}:${countdown.seconds}`
                  : `${countdown.minutes}:${countdown.seconds}`}
              </div>
            </div>
          </div>
          <ProgressBar progressData={progressData} />
          <div className={HotdealInfoCardStyles.quantityContainerStyle}>
            <div>
              <div>총 수량</div>
              <div>{data.total_quantity}개</div>
            </div>
            <div className={HotdealInfoCardStyles.currentQuantityWrapperStyle}>
              <div>남은 수량</div>
              <div className={HotdealInfoCardStyles.currentQuantityStyle}>
                {data.current_quantity}개
              </div>
            </div>
          </div>
          <div className={HotdealInfoCardStyles.gradeStyle}>
            참여 가능 등급: {data.min_user_grade} {getGradeIcon(data.min_user_grade)}
          </div>
        </div>
      </div>
      <div className={HotdealInfoCardStyles.descriptionContainerStyle}>
        <h2 className={HotdealInfoCardStyles.descriptionTitleStyle}>상품 설명</h2>
        <div className={HotdealInfoCardStyles.descriptionTextStyle}>{data.description}</div>
      </div>
    </div>
  );
};
