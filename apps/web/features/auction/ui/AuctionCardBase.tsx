import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
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
  return (
    <div className={auctionCardStyle.auctionCardContainerStyle}>
      <Card
        imageSrc={imageSrc}
        badgeVariant={badgeVariant}
        title={title}
        locationName={locationName}
        endTime={endTime}
        startTime={startTime}
      />
      {children}
    </div>
  );
};
