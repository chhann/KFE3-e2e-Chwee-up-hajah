import AuctionCard from '../../../entities/auction/ui/AuctionCard';

export const AuctionListings = () => {
  const mockListings = [
    {
      id: '1',
      imageSrc: '',
      badgeVariant: 'best' as const,
      title: '아디다스 스탠스미스',
      locationName: '서울시 도봉구',
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3일 후
      bidStartPrice: 70000,
      bidCurrentPrice: 230000,
      bidCount: 43,
    },
    {
      id: '2',
      imageSrc: '',
      badgeVariant: 'best' as const,
      title: '애플 운동화',
      locationName: '서울시 강남구',
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2일 후
      bidStartPrice: 70000,
      bidCurrentPrice: 230000,
      bidCount: 43,
    },
    {
      id: '3',
      imageSrc: '',
      badgeVariant: 'urgent' as const,
      title: '나이키 에어포스',
      locationName: '서울시 서초구',
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 18), // 18시간 후
      bidStartPrice: 50000,
      bidCurrentPrice: 180000,
      bidCount: 28,
    },
  ];

  return (
    <section className="px-4 py-4">
      <h2 className="sr-only">판매중인물품</h2>

      {/* 경매 아이템 목록 */}
      <div className="space-y-4">
        {mockListings.map((item) => (
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
        ))}
      </div>

      {/* 빈 상태 처리 */}
      {mockListings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="text-neutral-70 mb-2 text-lg font-medium">등록된 경매 상품이 없습니다</h3>
          <p className="text-neutral-40 mb-6">첫 번째 경매 상품을 등록해보세요</p>
          <button className="cursor-pointer rounded-lg bg-[var(--color-primary-500)] px-6 py-2 font-medium text-white">
            상품 등록하기
          </button>
        </div>
      )}
    </section>
  );
};
