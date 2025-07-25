import { redirect } from 'next/navigation';

import { Navigation, UserProfileCard } from '@/widgets/profile';

import { LogoutButton } from '@/widgets/authentication/LogoutButton';

import { getCurrentUser } from '@/app/session';
import { getProfile } from '@/shared/api/server/profile/getProfile';
import { NavigationItem } from '@/shared/types/profile';
import PointsTestButton from '@/widgets/profile/ui/PointsTestButton';

const pointItems: NavigationItem[] = [{ label: '적립내역', href: '/profile/points-history' }];

const auctionItems: NavigationItem[] = [
  { label: '판매 중인 물품', href: '/auction/my-listings' },
  { label: '참여 중인 경매', href: '/auction/my-participated' },
  { label: '낙찰 받은 물품', href: '/auction/my-won-auctions' },
];

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData.id!);
  console.log('userProfile:', userProfile);

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
      <section className="mb-7" aria-labelledby="account-settings-title">
        <h2 id="account-settings-title" className="mb-3 text-base font-semibold">
          계정 설정
        </h2>
        <LogoutButton />
        <PointsTestButton userId={userData.id} />
      </section>
    </main>
  );
};

export default Page;
