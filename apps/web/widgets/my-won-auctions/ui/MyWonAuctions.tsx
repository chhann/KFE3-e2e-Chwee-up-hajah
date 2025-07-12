import Link from 'next/link';

import { AuctionCardBase } from '@/features/auction/ui/AuctionCardBase';
import { AuctionContent } from '@/features/auction/ui/AuctionCardContent';
import { AuctionCardProps } from '@/shared/types/auction';
import { auctionListStyle } from '@/widgets/auction-listings/ui/styles/AuctionListings.styles';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
}

export const MyWonAuctions = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>낙찰된 물품</h2>

      {/* 경매 아이템 목록 */}
      <div className={auctionListStyle.auctionListBasicStyle}>
        {listData.map((item) => (
          <section key={item.id} className={auctionListStyle.auctionListCardStyle}>
            <Link href={`/auction/${item.id}/auction-detail`} key={item.id} className="block">
              <AuctionCardBase
                key={item.id}
                title={item.title}
                locationName={item.locationName}
                imageSrc={item.imageSrc}
                endTime={item.endTime}
                startTime={item.startTime}
              >
                <AuctionContent
                  primaryLabel="시작가"
                  primaryPriceValue={item.bidStartPrice}
                  secondaryLabel="낙찰가"
                  secondaryPriceValue={item.myWonPrice!}
                  bidCount={item.bidCount}
                  showBidButton={false}
                />
              </AuctionCardBase>
            </Link>
          </section>
        ))}
      </div>

      {/* 빈 상태 처리 */}
      {listData.length === 0 && (
        <div className={auctionListStyle.emptyListContainerStyle}>
          <h3 className={auctionListStyle.emptyListAddHeaderTextStyle}>낙찰된 상품이 없습니다</h3>
        </div>
      )}
    </section>
  );
};
