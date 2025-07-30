import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';

import { auctionListStyle } from '@/widgets/auction-listings/ui/styles/AuctionListings.styles';

import { AuctionListItem } from '@/features/auction/ui/AuctionListItem';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';

import { AuctionCardProps } from '@/shared/types/auction';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: 'ready' | 'in_progress' | 'closed'; // 경매 상태
}

export const MyListings = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>판매중인물품</h2>

      {listData.length === 0 ? (
        <div className={auctionListStyle.emptyListContainerStyle}>
          <h3 className={auctionListStyle.emptyListAddHeaderTextStyle}>
            등록된 경매 상품이 없습니다
          </h3>
          <p className={auctionListStyle.emptyListAddTextStyle}>첫 번째 경매 상품을 등록해보세요</p>
          <Link href="/auction/auction-add">
            <Button variants="primary" size="md">
              상품 등록하기
            </Button>
          </Link>
        </div>
      ) : (
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
              {item.status === 'closed' && <AuctionOverlay overlayText="경매가 종료되었습니다." />}
            </section>
          ))}
        </div>
      )}
    </section>
  );
};
