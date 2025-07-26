import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { getTimeLeftString } from '@repo/ui/utils/getTimeLeftString';
import { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { auctionCardStyle } from './styles/AuctionCard.styles';

export interface AuctionCardBaseProps extends CardProps {
  title: string;
  locationName: string;
  imageSrc: string;
  endTime: Date | string;
  startTime?: Date | string;
  badgeVariant?: 'best' | 'urgent' | null;
  children: React.ReactNode;
}

export const AuctionCardBase = ({
  title,
  locationName,
  imageSrc,
  endTime,
  startTime,
  badgeVariant,
  children,
}: AuctionCardBaseProps) => {
  const [displayRemainingTime, setDisplayRemainingTime] = useState(''); // 새로운 상태 추가
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
        <span>{title}</span>
        <div className={auctionCardStyle.cardInfoContainerStyle}>
          <div className={auctionCardStyle.cardLocationStyle}>
            <LocationInfo address={locationName} />
          </div>
          <div className={auctionCardStyle.cardInfoLeftTimeStyle}>
            <FaRegClock />
            {displayRemainingTime}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
