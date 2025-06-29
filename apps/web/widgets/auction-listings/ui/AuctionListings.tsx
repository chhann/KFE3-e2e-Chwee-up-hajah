import Link from 'next/link';

import AuctionCard, { AuctionCardProps } from '@/features/auction/ui/AuctionCard';
import { AuctionOverlay } from '@/features/auction/ui/AuctionOverlay';

interface MockAuctionCardProps extends AuctionCardProps {
  id: string;
  status: string; // 경매 상태
}

export const AuctionListings = ({ listData }: { listData: MockAuctionCardProps[] }) => {
  return (
    <section className="px-4 py-4">
      <h2 className="sr-only">판매중인물품</h2>

      {/* 경매 아이템 목록 */}
      <div className="space-y-4">
        {listData.map((item) => (
          <section key={item.id} className="relative">
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
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="text-neutral-70 mb-2 text-lg font-medium">등록된 경매 상품이 없습니다</h3>
          <p className="text-neutral-40 mb-6">첫 번째 경매 상품을 등록해보세요</p>
          <Link href="/auction/auction-add">
            <button className="cursor-pointer rounded-lg bg-[var(--color-primary-500)] px-6 py-2 font-medium text-white">
              상품 등록하기
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};
