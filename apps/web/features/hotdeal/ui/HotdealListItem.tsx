'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AuctionListItemStyles } from '@/features/auction/ui/styles/AuctionListItem.styles';

import { getGradeIcon } from '@/shared/lib/points/getGradeIcon';
import { HotDeal } from '@/shared/types/db';

import { useHotdealCountdownLogic } from '../model/useHotdealCountdownLogic';

interface HotdealListItemProps {
  hotdeal: HotDeal & {
    status: string;
  };
}

export const HotdealListItem = ({ hotdeal }: HotdealListItemProps) => {
  const { countdown } = useHotdealCountdownLogic({ data: hotdeal });

  return (
    <Link
      href={`/hotdeal/${hotdeal.id}/detail`}
      className={AuctionListItemStyles.itemContainerStyle}
    >
      <div className={AuctionListItemStyles.itemImageContainerStyle}>
        <Image src={hotdeal.image_url} alt={hotdeal.name} layout="fill" objectFit="cover" />
      </div>
      <div className={AuctionListItemStyles.itemContentsContainerStyle}>
        <p className={AuctionListItemStyles.itemTitleStyle}>{hotdeal.name}</p>
        <p className={AuctionListItemStyles.itemCurrentPriceStyle}>
          {hotdeal.current_price.toLocaleString()}원
        </p>
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <span>
            최소 등급: {hotdeal.min_user_grade}
            {getGradeIcon(hotdeal.min_user_grade)}
          </span>
        </div>
        <div className={AuctionListItemStyles.itemSmallTextContainerStyle}>
          <span>
            {countdown.message}{' '}
            {countdown.hours !== '00'
              ? `${countdown.hours}:${countdown.minutes}:${countdown.seconds}`
              : `${countdown.minutes}:${countdown.seconds}`}
          </span>
        </div>
      </div>
    </Link>
  );
};
