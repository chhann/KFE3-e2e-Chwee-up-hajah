import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { IoPersonOutline } from 'react-icons/io5';
import { autionCardStyle } from './style/AuctionCard.styles';

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
    <div className={autionCardStyle.auctionCardContainerStyle}>
      <Card
        imageSrc={imageSrc}
        badgeVariant={badgeVariant}
        title={title}
        locationName={locationName}
        endTime={endTime}
      />
      {/* 제목 및 입찰 내용 */}
      <section className={autionCardStyle.auctionCardInfoContainerStyle}>
        <div className={autionCardStyle.auctionCardInfoContentsSectionStyle}>
          <div>
            <label className={autionCardStyle.auctionCardInfoLabelStyle}>시작가</label>
            <div>{startPrice}원</div>
          </div>
          <div className={autionCardStyle.auctionCardInfoCurrentPriceWrapperStyle}>
            <label>현재 입찰가</label>
            <div className={autionCardStyle.auctionCardInfoCurrentPriceStyle}>{currentPrice}원</div>
          </div>
        </div>
        <Button variants="primary" size="lg">
          입찰하기
        </Button>
        <div className={autionCardStyle.auctionCardFooterContainerStyle}>
          <IoPersonOutline />
          <div>
            입찰
            <span className={autionCardStyle.auctionCardFooterBidCountStyle}> {bidCount}</span>건
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuctionCard;
