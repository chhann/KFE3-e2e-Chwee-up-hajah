import Link from 'next/link';

import AuctionCard, { AuctionCardProps } from '@/features/auction/ui/AuctionCard';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import {
  AuctionListCardStyle,
  AuctionListingContainerStyle,
  AuctionListingLabelStyle,
  AuctionListStyle,
  EmptyListAddHeaderTextStyle,
  EmptyListAddTextStyle,
  EmptyListContainerStyle,
} from './styles/AuctionListings.styles';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: string; // 경매 상태
}

export const AuctionListings = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={AuctionListingContainerStyle}>
      <h2 className={AuctionListingLabelStyle}>판매중인물품</h2>

      {/* 경매 아이템 목록 */}
      <div className={AuctionListStyle}>
        {listData.map((item) => (
          <section key={item.id} className={AuctionListCardStyle}>
            <Link href={`/auction/${item.id}/auction-detail`} key={item.id} className="block">
              <AuctionCard
                key={item.id}
                imageSrc={item.imageSrc}
                badgeVariant={item.badgeVariant}
                title={item.title}
                locationName={item.locationName}
                endTime={item.endTime}
                bidStartPrice={item.bidStartPrice}
                bidCurrentPrice={item.bidCurrentPrice}
                bidCount={item.bidCount}
              />
            </Link>
            {item.status === 'end' && <AuctionOverlay overlayText="경매가 종료되었습니다." />}
          </section>
        ))}
      </div>

      {/* 빈 상태 처리 */}
      {listData.length === 0 && (
        <div className={EmptyListContainerStyle}>
          <h3 className={EmptyListAddHeaderTextStyle}>등록된 경매 상품이 없습니다</h3>
          <p className={EmptyListAddTextStyle}>첫 번째 경매 상품을 등록해보세요</p>
          <Link href="/auction/auction-add">
            <Button variants="primary" size="md">
              상품 등록하기
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};
