import { IoPersonOutline } from 'react-icons/io5';

import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { auctionCardStyle } from './styles/AuctionCard.styles';

interface AuctionContentProps {
  primaryLabel?: string; // 예: "내 입찰가", "시작가"
  primaryPriceValue?: number;

  secondaryLabel?: string; // 예: "현재 입찰가", "낙찰가"
  secondaryPriceValue?: number;

  bidCount: number; // 입찰 건수
}

export const AuctionContent = ({
  primaryLabel,
  primaryPriceValue,
  secondaryLabel,
  secondaryPriceValue,
  bidCount,
}: AuctionContentProps) => {
  const formattedPrimaryPrice = formatPriceNumber(primaryPriceValue ?? 0);
  const formattedSecondaryPrice = formatPriceNumber(secondaryPriceValue ?? 0);

  return (
    <section className={auctionCardStyle.auctionCardInfoContainerStyle}>
      <div className={auctionCardStyle.auctionCardInfoContentsSectionStyle}>
        {primaryLabel && (
          <div>
            <label className={auctionCardStyle.auctionCardInfoLabelStyle}>{primaryLabel}</label>
            <div>{formattedPrimaryPrice}원</div>
          </div>
        )}
        {secondaryLabel && (
          <div className={auctionCardStyle.auctionCardInfoCurrentPriceWrapperStyle}>
            <label>{secondaryLabel}</label>
            <div className={auctionCardStyle.auctionCardInfoCurrentPriceStyle}>
              {formattedSecondaryPrice}원
            </div>
          </div>
        )}
      </div>
      <div className={auctionCardStyle.auctionCardFooterContainerStyle}>
        <IoPersonOutline />
        <div>
          입찰 <span className={auctionCardStyle.auctionCardFooterBidCountStyle}>{bidCount}</span>건
        </div>
      </div>
    </section>
  );
};
