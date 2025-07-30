'use client';

import { auctionListStyle } from '@/widgets/auction-listings/ui/styles/AuctionListings.styles';

import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';
import { HotdealListItem } from '@/features/hotdeal/ui/HotdealListItem';

import { HotDeal } from '@/shared/types/db';

export const HotdealListings = ({ listData }: { listData: (HotDeal & { status: string })[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      {listData.length === 0 ? (
        <div className={auctionListStyle.emptyListContainerStyle}>
          <h3 className={auctionListStyle.emptyListAddHeaderTextStyle}>
            공개된 핫딜 상품이 없습니다
          </h3>
        </div>
      ) : (
        <div className={auctionListStyle.auctionListBasicStyle}>
          {listData.map((item) => (
            <div key={item.id} className={auctionListStyle.auctionListCardStyle}>
              <HotdealListItem key={item.id} hotdeal={item} />
              {item.status === '종료됨' && <AuctionOverlay overlayText="핫딜이 종료되었습니다." />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
