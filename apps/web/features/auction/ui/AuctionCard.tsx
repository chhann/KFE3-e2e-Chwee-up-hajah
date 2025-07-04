import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { IoPersonOutline } from 'react-icons/io5';
import {
  AuctionCardContainerStyle,
  AuctionCardFooterBidCountStyle,
  AuctionCardFooterContainerStyle,
  AuctionCardInfoContainerStyle,
  AuctionCardInfoContentsSectionStyle,
  AuctionCardInfoCurrentPriceStyle,
  AuctionCardInfoCurrentPriceWrapperStyle,
  AuctionCardInfoLabelStyle,
} from './style/AuctionCard.styles';

export interface AuctionCardProps extends CardProps {
  badgeVariant?: 'best' | 'urgent' | null;
  bidStartPrice: number;
  bidCurrentPrice: number;
  bidCount: number;
}
const AuctionCard = ({
  title,
  locationName,
  imageSrc,
  endTime,
  badgeVariant,
  bidStartPrice,
  bidCurrentPrice,
  bidCount,
}: AuctionCardProps) => {
  const startPrice = formatPriceNumber(bidStartPrice);
  const currentPrice = formatPriceNumber(bidCurrentPrice);
  return (
    <div className={AuctionCardContainerStyle}>
      <Card
        imageSrc={imageSrc}
        badgeVariant={badgeVariant}
        title={title}
        locationName={locationName}
        endTime={endTime}
      />
      {/* 제목 및 입찰 내용 */}
      <section className={AuctionCardInfoContainerStyle}>
        <div className={AuctionCardInfoContentsSectionStyle}>
          <div>
            <label className={AuctionCardInfoLabelStyle}>시작가</label>
            <div>{startPrice}원</div>
          </div>
          <div className={AuctionCardInfoCurrentPriceWrapperStyle}>
            <label>현재 입찰가</label>
            <div className={AuctionCardInfoCurrentPriceStyle}>{currentPrice}원</div>
          </div>
        </div>
        <Button variants="primary" size="lg">
          입찰하기
        </Button>
        <div className={AuctionCardFooterContainerStyle}>
          <IoPersonOutline />
          <div>
            입찰
            <span className={AuctionCardFooterBidCountStyle}> {bidCount}</span>건
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuctionCard;
