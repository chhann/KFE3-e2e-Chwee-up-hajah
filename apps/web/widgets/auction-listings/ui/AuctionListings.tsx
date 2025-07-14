'use client';
import Link from 'next/link';

import { AuctionCardBase } from '@/features/auction/ui/AuctionCardBase';
import { AuctionContent } from '@/features/auction/ui/AuctionCardContent';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';
import { AuctionCardProps } from '@/shared/types/auction';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { auctionListStyle } from './styles/AuctionListings.styles';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: string; // 경매 상태
}

export const AuctionListings = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>판매중인물품</h2>

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
                  secondaryLabel="현재 입찰가"
                  secondaryPriceValue={item.bidCurrentPrice}
                  bidCount={item.bidCount}
                />
              </AuctionCardBase>
            </Link>
            {item.status === 'end' && <AuctionOverlay overlayText="경매가 종료되었습니다." />}
          </section>
        ))}
      </div>

      {/* 빈 상태 처리 */}
      {listData.length === 0 && (
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
      )}
    </section>
  );
};
