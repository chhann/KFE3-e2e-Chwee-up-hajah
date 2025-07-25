'use client';

import { Badge } from '../Badge';
import { cardStyle } from './Card.styles';

export interface CardProps {
  imageSrc: string;
  badgeVariant?: 'best' | 'urgent' | null;
  title?: string;
  locationName: string;
  endTime: Date | string;
  startTime?: Date | string;
}

const Card = ({ imageSrc, badgeVariant, title }: CardProps) => {
  const badgeTitle =
    badgeVariant === 'best' ? '인기' : badgeVariant === 'urgent' ? '마감임박' : null;
  return (
    <section className={cardStyle.cardTitleStyle}>
      <div className={cardStyle.cardImageContainerStyle}>
        <img src={imageSrc} alt={title} className={cardStyle.cardImageStyle} />
        {badgeVariant && (
          <Badge variant={badgeVariant} className={cardStyle.cardImageBadgeStyle}>
            {badgeTitle}
          </Badge>
        )}
      </div>

      <span className="mt-2">{title}</span>
    </section>
  );
};

export default Card;
