import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';

import { auctionListStyle } from '@/widgets/auction-listings/ui/styles/AuctionListings.styles';

import { AuctionCardBase } from '@/features/auction/ui/AuctionCardBase';
import { AuctionContent } from '@/features/auction/ui/AuctionCardContent';

import { AuctionCardProps } from '@/shared/types/auction';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: 'ready' | 'in_progress' | 'closed'; // 경매 상태
}

export const MyParticipatedAuctions = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>판매중인물품</h2>

      {/* 경매 아이템 목록 */}
      <div className={auctionListStyle.auctionListBasicStyle}>
        {listData.map((item, index) => (
          <section key={index} className={auctionListStyle.auctionListCardStyle}>
            <Link href={`/auction/${item.id}/auction-detail`} key={item.id} className="block">
              <AuctionCardBase
                key={item.id}
                title={item.title || ''}
                locationName={item.locationName}
                imageSrc={item.imageSrc}
                endTime={item.endTime}
                startTime={item.startTime}
                badgeVariant={item.badgeVariant}
                status={item.status}
              >
                <AuctionContent
                  primaryLabel="내 입찰가"
                  primaryPriceValue={item.myBidPrice!}
                  secondaryLabel="현재 입찰가"
                  secondaryPriceValue={item.bidCurrentPrice}
                  bidCount={item.bidCount}
                />
              </AuctionCardBase>
            </Link>
          </section>
        ))}
      </div>

      {/* 빈 상태 처리 */}
      {listData.length === 0 && (
        <div className={auctionListStyle.emptyListContainerStyle}>
          <h3 className={auctionListStyle.emptyListAddHeaderTextStyle}>
            참여중인 경매가 없습니다.
          </h3>
          <p className={auctionListStyle.emptyListAddTextStyle}>경매에 참여해보세요</p>
          <Link href="/auction/auction-list">
            <Button variants="primary" size="md">
              경매 참여하기
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};
