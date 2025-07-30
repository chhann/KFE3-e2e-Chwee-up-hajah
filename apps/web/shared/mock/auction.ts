export const mockListings = [
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

export const categories = [
  { title: '전체' },
  { title: '가전/전자' },
  { title: '도서/티켓' },
  { title: '뷰티' },
  { title: '사무/잡화' },
  { title: '스포츠용품' },
  { title: '악세서리' },
  { title: '의류' },
  { title: '생활/주방' },
  { title: '기타' },
];

//  { title: '전체', imageUrl: '/category-images/category_all.svg' },                                                                                                  │
//  { title: '가전/전자', imageUrl: '/category-images/refrigerator.avif' },                                                                                            │
//  { title: '도서/티켓', imageUrl: '/category-images/book.avif' },                                                                                                    │
//  { title: '뷰티', imageUrl: '/category-images/cosmetics.avif' },                                                                                                    │
//  { title: '사무/잡화', imageUrl: '/category-images/office-supplies.avif' },                                                                                         │
//  { title: '스포츠용품', imageUrl: '/category-images/dumbbell.avif' },                                                                                               │
//  { title: '악세서리', imageUrl: '/category-images/clock.avif' },                                                                                                    │
//  { title: '의류', imageUrl: '/category-images/clothes.avif' },                                                                                                      │
//  { title: '생활/주방', imageUrl: '/category-images/kitchen.avif' },                                                                                                 │
//  { title: '기타', imageUrl: '/category-images/etc.svg' },

export const auctionMockData = {
  auctionName: '빈티지시계 - 한정판',
  currentBidCost: 110000,
  startBidCost: 50000,
  remainingTime: '2일 3시간 15분',
  bidUnit: 5000, // 입찰 단위 비용 (예: 5,000원)
};
export const mockBids = [
  { id: 1, bidder: '닉앤쥬디', price: 40000, timestamp: '2025-03-02T14:23:42' },
  { id: 2, bidder: '닉앤쥬디', price: 35000, timestamp: '2025-03-02T14:20:00' },
  { id: 3, bidder: '닉앤쥬디', price: 30000, timestamp: '2025-03-02T14:10:00' },
];
