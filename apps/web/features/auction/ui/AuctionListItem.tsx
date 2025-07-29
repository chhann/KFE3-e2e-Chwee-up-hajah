import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import Image from 'next/image';
import Link from 'next/link';

import { AuctionListItemStyles } from './styles/AuctionListItem.styles';

interface AuctionListItemProps {
  id: string;
  imageSrc: string;
  title: string;
  bidCurrentPrice: number;
  bidCount: number;
  startTime: string;
  endTime: string;
  status: 'ready' | 'in_progress' | 'closed';
}

export const AuctionListItem = ({
  id,
  imageSrc,
  title,
  bidCurrentPrice,
  bidCount,
  startTime,
  endTime,
  status,
}: AuctionListItemProps) => {
  const auctionStausText =
    status === 'ready' ? '시작까지' : status === 'in_progress' ? '종료까지' : '경매 종료';
  const timeLeft = getTimeLeftString({ endDate: endTime, startDate: startTime });

  return (
    <Link
      href={`/auction/${id}/auction-detail`}
      className={AuctionListItemStyles.itemContainerStyle}
    >
      <div className={AuctionListItemStyles.itemImageContainerStyle}>
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className={AuctionListItemStyles.itemContentsContainerStyle}>
        <p className={AuctionListItemStyles.itemTitleStyle}>{title}</p>
        <p className={AuctionListItemStyles.itemCurrentPriceStyle}>
          {bidCurrentPrice.toLocaleString()}원
        </p>
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <span>
            {auctionStausText}: {timeLeft}
          </span>
          <span>입찰 {bidCount}건</span>
        </div>
      </div>
    </Link>
  );
};
