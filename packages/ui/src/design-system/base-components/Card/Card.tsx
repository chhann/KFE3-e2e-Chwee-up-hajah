'use client';

import { useEffect, useState } from 'react'; // useState, useEffect 추가
import { FaRegClock } from 'react-icons/fa6';
import { getTimeLeftString } from '../../../utils/getTimeLeftString';
import { Badge } from '../Badge';
import { LocationInfo } from '../LocationInfo';
import { cardStyle } from './Card.styles';

export interface CardProps {
  imageSrc: string;
  badgeVariant?: 'best' | 'urgent' | null;
  title: string;
  locationName: string;
  endTime: Date | string;
  startTime?: Date | string;
}

const Card = ({ imageSrc, badgeVariant, title, locationName, endTime, startTime }: CardProps) => {
  const [displayRemainingTime, setDisplayRemainingTime] = useState(''); // 새로운 상태 추가

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayRemainingTime(getTimeLeftString({ endDate: endTime, startDate: startTime }));
    }, 1000);
    return () => clearInterval(interval); // 클린업 함수
  }, [endTime, startTime]); // endTime, startTime이 변경될 때마다 useEffect 재실행

  const badgeTitle =
    badgeVariant === 'best' ? '인기' : badgeVariant === 'urgent' ? '마감임박' : null;
  return (
    <section>
      <div className={cardStyle.cardImageContainerStyle}>
        <img src={imageSrc} alt={title} className={cardStyle.cardImageStyle} />
        {badgeVariant && (
          <Badge variant={badgeVariant} className={cardStyle.cardImageBadgeStyle}>
            {badgeTitle}
          </Badge>
        )}
      </div>
      <div className={cardStyle.cardInfoContainerStyle}>
        <LocationInfo address={locationName} />
        <div className={cardStyle.cardInfoLeftTimeStyle}>
          <FaRegClock />
          {displayRemainingTime}
        </div>
      </div>
      <span className={cardStyle.cardTitleStyle}>{title}</span>
    </section>
  );
};

export default Card;
