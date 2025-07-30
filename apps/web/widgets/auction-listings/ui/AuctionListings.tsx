'use client';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { AuctionListItem } from '@/features/auction/ui/AuctionListItem';

import { AuctionCardProps } from '@/shared/types/auction';

import { auctionListStyle } from './styles/AuctionListings.styles';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: 'ready' | 'in_progress' | 'closed';
}

export const AuctionListings = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  const params = useSearchParams();
  const searchParams = params.get('search') || null;

  return (
    <section className={auctionListStyle.auctionListingContainerStyle}>
      <h2 className={auctionListStyle.auctionListingLabelStyle}>판매중인물품</h2>

      {listData.length === 0 && searchParams ? (
        // Case 1: 검색어가 있고, listData가 비어있을 때 (검색 결과 없음)
        <div className={auctionListStyle.emptyListContainerStyle}>
          <h3 className={auctionListStyle.emptySearchListAddHeaderTextStyle}>
            검색 결과가 없습니다.
          </h3>
          <p className={auctionListStyle.emptySearchListAddTextStyle}>
            &quot;{searchParams}&quot;에 대한 검색 결과가 없습니다.
          </p>
        </div>
      ) : listData.length === 0 && !searchParams ? (
        // Case 2: 검색어가 없고, listData가 비어있을 때 (경매 상품이 없음)
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
        // Case 3: listData에 데이터가 있을 때 (경매 목록을 보여줌)
        <div className={auctionListStyle.auctionListBasicStyle}>
          {listData.map((item) => (
            <AuctionListItem
              key={item.id}
              id={item.id}
              imageSrc={item.imageSrc}
              title={item.title ?? ''}
              bidCurrentPrice={item.bidCurrentPrice}
              bidCount={item.bidCount}
              startTime={item.startTime}
              endTime={item.endTime}
              status={item.status}
            />
          ))}
        </div>
      )}
    </section>
  );
};
