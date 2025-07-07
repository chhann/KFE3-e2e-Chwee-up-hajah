'use client';

import { AuctionCardProps } from '@/shared/types/auction';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card } from '@repo/ui/design-system/base-components/Card/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { IoPersonOutline } from 'react-icons/io5';
import { auctionCardStyle } from './styles/AuctionCard.styles';

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
    <div className={auctionCardStyle.auctionCardContainerStyle}>
      <Card
        imageSrc={imageSrc}
        badgeVariant={badgeVariant}
        title={title}
        locationName={locationName}
        endTime={endTime}
      />
      {/* 제목 및 입찰 내용 */}
      <section className={auctionCardStyle.auctionCardInfoContainerStyle}>
        <div className={auctionCardStyle.auctionCardInfoContentsSectionStyle}>
          <div>
            <label className={auctionCardStyle.auctionCardInfoLabelStyle}>시작가</label>
            <div>{startPrice}원</div>
          </div>
          <div className={auctionCardStyle.auctionCardInfoCurrentPriceWrapperStyle}>
            <label>현재 입찰가</label>
            <div className={auctionCardStyle.auctionCardInfoCurrentPriceStyle}>
              {currentPrice}원
            </div>
          </div>
        </div>
        <Button variants="primary" size="lg">
          입찰하기
        </Button>
        <div className={auctionCardStyle.auctionCardFooterContainerStyle}>
          <IoPersonOutline />
          <div>
            입찰
            <span className={auctionCardStyle.auctionCardFooterBidCountStyle}> {bidCount}</span>건
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuctionCard;
