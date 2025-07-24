'use client';

import Link from 'next/link';

const banners = [
  {
    id: 1,
    imageUrl: '/placeholder.svg',
    redirectUrl: 'https://example.com/event1',
    startTime: '2025-07-23T10:00:00',
    endTime: '2025-07-25T23:59:59',
  },
  {
    id: 2,
    imageUrl: '/placeholder.svg',
    redirectUrl: 'https://example.com/event2',
    startTime: '2025-07-26T00:00:00',
    endTime: '2025-07-28T23:59:59',
  },
];

export default function EventBannerManagerPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">이벤트 배너 관리</h1>
      <div className="space-y-4"></div>

      <Link href="/admin/events">이벤트 관리 페이지로 이동</Link>
    </div>
  );
}
