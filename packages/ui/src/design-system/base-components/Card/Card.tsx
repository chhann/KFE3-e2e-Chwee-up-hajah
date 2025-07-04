import { FaRegClock } from 'react-icons/fa6';
import { getTimeLeftString } from '../../../utils/getTimeLeftString';
import { Badge } from '../Badge';
import { LocationInfo } from '../LocationInfo';
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
    <div>
      <section>
        <div className="relative">
          <img src={imageSrc} alt={title} className="h-48 w-full rounded-t-lg object-cover" />
          {badgeVariant && (
            <Badge variant={badgeVariant} className="absolute right-2 top-2">
              {badgeTitle}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <LocationInfo address={locationName} />
          <div className="text-neutral-70 flex items-center gap-1 truncate">
            <FaRegClock />
            {leftTime}
          </div>
        </div>
        <span className="text-lg font-semibold">{title}</span>
      </section>
    </div>
  );
};

export default Card;
