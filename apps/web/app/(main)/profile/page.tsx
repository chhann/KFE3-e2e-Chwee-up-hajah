import { redirect } from 'next/navigation';

import { Navigation, UserProfileCard } from '@/widgets/profile'; // UserProfileType import 추가

import { getProfile } from '@/features/profile/api/getProfile';

import { getCurrentUser } from '@/app/session';
import { NavigationItem } from '@/types/profile';

const pointItems: NavigationItem[] = [
  { label: '충전내역', href: '/profile/charge-history' },
  { label: '사용내역', href: '/1' },
];

const auctionItems: NavigationItem[] = [
  { label: '판매 중인 물품', href: '/2' },
  { label: '참여 중인 경매', href: '/3' },
  { label: '낙찰 받은 물품', href: '/4' },
];

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData.id!);

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">프로필</h1>
      <UserProfileCard user={userProfile!} />

      <section className="mb-7" aria-labelledby="point-management-title">
        <h2 id="point-management-title" className="mb-3 text-base font-semibold">
          포인트 내역 관리
        </h2>
        <Navigation title="포인트 내역 메뉴" items={pointItems} />
      </section>

      <section className="mb-7" aria-labelledby="auction-status-title">
        <h2 id="auction-status-title" className="mb-3 text-base font-semibold">
          내 경매 현황
        </h2>
        <Navigation title="경매 현황 메뉴" items={auctionItems} />
      </section>
    </main>
  );
};

export default Page;
