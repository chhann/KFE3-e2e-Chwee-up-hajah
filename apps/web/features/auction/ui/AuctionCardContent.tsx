import { IoPersonOutline } from 'react-icons/io5';

import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { auctionCardStyle } from './styles/AuctionCard.styles';
import { Button } from '@repo/ui/design-system/base-components/Button/index';

interface AuctionContentProps {
  primaryLabel: string; // 예: "내 입찰가", "시작가"
  primaryPriceValue: number;

  secondaryLabel: string; // 예: "현재 입찰가", "낙찰가"
  secondaryPriceValue: number;

  bidCount: number; // 입찰 건수
  showBidButton?: boolean; // 입찰 버튼 보여주기
}

export const AuctionContent = ({
  primaryLabel,
  primaryPriceValue,
  secondaryLabel,
  secondaryPriceValue,
  bidCount,
  showBidButton = true,
}: AuctionContentProps) => {
  const formattedPrimaryPrice = formatPriceNumber(primaryPriceValue);
  const formattedSecondaryPrice = formatPriceNumber(secondaryPriceValue);

  return (
    <section className={auctionCardStyle.auctionCardInfoContainerStyle}>
      <div className={auctionCardStyle.auctionCardInfoContentsSectionStyle}>
        <div>
          <label className={auctionCardStyle.auctionCardInfoLabelStyle}>{primaryLabel}</label>
          <div>{formattedPrimaryPrice}원</div>
        </div>
        <div className={auctionCardStyle.auctionCardInfoCurrentPriceWrapperStyle}>
          <label>{secondaryLabel}</label>
          <div className={auctionCardStyle.auctionCardInfoCurrentPriceStyle}>
            {formattedSecondaryPrice}원
          </div>
        </div>
      </div>
      {showBidButton && (
        <Button variants="primary" size="lg">
          입찰하기
        </Button>
      )}
      <div className={auctionCardStyle.auctionCardFooterContainerStyle}>
        <IoPersonOutline />
        <div>
          입찰 <span className={auctionCardStyle.auctionCardFooterBidCountStyle}>{bidCount}</span>건
        </div>
      </div>
    </section>
  );
};
