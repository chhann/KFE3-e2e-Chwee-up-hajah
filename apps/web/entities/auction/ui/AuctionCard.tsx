import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card, CardProps } from '@repo/ui/design-system/base-components/Card/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { IoPersonOutline } from 'react-icons/io5';

interface AuctionCardProps extends CardProps {
  badgeVariant?: 'best' | 'urgent';
  bidStartPrice: number;
  bidCurrentPrice: number;
  bidCount: number;
}
const AuctionCard = ({
  badgeVariant,
  bidStartPrice,
  bidCurrentPrice,
  bidCount,
}: AuctionCardProps) => {
  const startPrice = formatPriceNumber(bidStartPrice);
  const currentPrice = formatPriceNumber(bidCurrentPrice);
  return (
    <div className="border-neutral-20 w-full rounded-lg border p-4 shadow-md">
      <Card
        imageSrc="./favicon.ico"
        badgeVariant={badgeVariant}
        title="파비콘"
        locationName="서울시 강남구"
        endTime={new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)}
      />
      {/* 제목 및 입찰 내용 */}
      <section className="mt-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <label className="text-sm">시작가</label>
            <div>{startPrice}원</div>
          </div>
          <div className="text-neutral-70 flex flex-col items-end">
            <label>현재 입찰가</label>
            <div className="text-xl font-bold">{currentPrice}원</div>
          </div>
        </div>
        <Button variants="primary" size="lg">
          입찰하기
        </Button>
        <div className="text-neutral-70 flex justify-center gap-2">
          <IoPersonOutline />
          <div className="text-xs">
            입찰
            <span className="font-bold"> {bidCount}</span>건
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuctionCard;
