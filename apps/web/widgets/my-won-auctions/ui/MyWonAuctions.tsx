import { auctionListStyle } from '@/widgets/auction-listings/ui/styles/AuctionListings.styles';

import { AuctionListItem } from '@/features/auction/ui/AuctionListItem';

import { AuctionCardProps } from '@/shared/types/auction';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: 'ready' | 'in_progress' | 'closed';
}

export const MyWonAuctions = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>낙찰된 물품</h2>

      {/* 경매 아이템 목록 */}
      <div className={auctionListStyle.auctionListBasicStyle}>
        {listData.map((item) => (
          <section key={item.id} className={auctionListStyle.auctionListCardStyle}>
            <AuctionListItem
              id={item.id}
              imageSrc={item.imageSrc}
              title={item.title ?? ''}
              bidCurrentPrice={item.bidCurrentPrice}
              bidCount={item.bidCount}
              startTime={item.startTime}
              endTime={item.endTime}
              status={item.status}
            />
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
