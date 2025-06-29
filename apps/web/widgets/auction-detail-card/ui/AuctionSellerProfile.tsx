import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';

import { AuctionDetail } from '@/types/db';

interface AuctionSellerProfileProps {
  user: AuctionDetail['seller'];
}

export const AuctionSellerProfile = ({ user }: AuctionSellerProfileProps) => {
  return (
    <section className="border-neutral-30 text-neutral-70 w-full rounded-md border px-5 py-2">
      <h1 id="profile-header-title">판매자 정보</h1>
      <div className="flex items-center">
        <Avatar
          className="mr-4"
          src={user.avatar}
          alt={`${user.username} 프로필 이미지`}
          name={user.username || '사용자'}
          size="lg"
        />
        <div className="grow">
          <header className="flex items-center justify-between">
            <h3 className="mb-1 text-sm font-semibold">{user.username}</h3>
          </header>
          <div className="mb-1 text-xs not-italic">
            온도 {user.score} · 판매 {user.selling_auction?.length || 0}
          </div>

          <LocationInfo address={user.address} />
        </div>
      </div>
    </section>
  );
};
