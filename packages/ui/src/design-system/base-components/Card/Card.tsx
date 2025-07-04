import { FaRegClock } from 'react-icons/fa6';
import { getTimeLeftString } from '../../../utils/getTimeLeftString';
import { Badge } from '../Badge';
import { LocationInfo } from '../LocationInfo';
import {
  cardImageBadgeStyle,
  cardImageContainerStyle,
  cardImageStyle,
  cardInfoContainerStyle,
  cardInfoLeftTimeStyle,
  cardTitleStyle,
} from './Card.styles';
export interface CardProps {
  imageSrc: string;
  badgeVariant?: 'best' | 'urgent' | null;
  title: string;
  locationName: string;
  endTime: Date | string;
}

const Card = ({ imageSrc, badgeVariant, title, locationName, endTime }: CardProps) => {
  const leftTime = getTimeLeftString(endTime);
  const badgeTitle =
    badgeVariant === 'best' ? '인기' : badgeVariant === 'urgent' ? '마감임박' : null;
  return (
    <section>
      <div className={cardImageContainerStyle}>
        <img src={imageSrc} alt={title} className={cardImageStyle} />
        {badgeVariant && (
          <Badge variant={badgeVariant} className={cardImageBadgeStyle}>
            {badgeTitle}
          </Badge>
        )}
      </div>
      <div className={cardInfoContainerStyle}>
        <LocationInfo address={locationName} />
        <div className={cardInfoLeftTimeStyle}>
          <FaRegClock />
          {leftTime}
        </div>
      </div>
      <span className={cardTitleStyle}>{title}</span>
    </section>
  );
};

export default Card;
