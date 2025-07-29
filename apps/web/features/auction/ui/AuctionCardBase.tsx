import { useEffect, useState } from 'react';

import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';

import { auctionCardStyle } from './styles/AuctionCard.styles';

export interface AuctionCardBaseProps extends CardProps {
  title: string;
  locationName: string;
  imageSrc: string;
  endTime: Date | string;
  startTime?: Date | string;
  status?: 'ready' | 'in_progress' | 'closed';
  badgeVariant?: 'best' | 'urgent' | null;
  children: React.ReactNode;
}

export const AuctionCardBase = ({
  title,
  locationName,
  imageSrc,
  endTime,
  startTime,
  status,
  badgeVariant,
  children,
}: AuctionCardBaseProps) => {
  const [displayRemainingTime, setDisplayRemainingTime] = useState(''); // 새로운 상태 추가
  const statusText =
    status === 'in_progress'
      ? '경매 종료까지'
      : status === 'closed'
        ? '경매 종료'
        : '경매 시작까지';
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayRemainingTime(getTimeLeftString({ endDate: endTime, startDate: startTime }));
    }, 1000);
    return () => clearInterval(interval); // 클린업 함수
  }, [endTime, startTime]); // endTime, startTime이 변경될 때마다 useEffect 재실행
  return (
    <div className={auctionCardStyle.auctionCardContainerStyle}>
      <div className={auctionCardStyle.auctionCardSectionStyle}>
        <Card
          imageSrc={imageSrc}
          badgeVariant={badgeVariant}
          locationName={locationName}
          endTime={endTime}
          startTime={startTime}
        />
      </div>
      <div className={auctionCardStyle.auctionCardInfoSectionContainerStyle}>
        <span className={auctionCardStyle.auctionCardInfoTitleStyle}>{title}</span>
        <div className={auctionCardStyle.cardInfoContainerStyle}>
          <div className={auctionCardStyle.cardInfoLeftTimeStyle}>
            {statusText} - {displayRemainingTime}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
