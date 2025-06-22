import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';

import { UserProfileType } from '../../profile';

interface AuctionSellerProfileProps {
  user: UserProfileType;
}

export const AuctionSellerProfile = ({ user }: AuctionSellerProfileProps) => {
  return (
    <section className="border-neutral-30 text-neutral-70 w-full rounded-md border px-5 py-2">
      <h1 id="profile-header-title">판매자 정보</h1>
      <div className="flex items-center">
        <Avatar
          className="mr-4"
          src={user.profileImageUrl}
          alt={`${user.name} 프로필 이미지`}
          name={user.name || '사용자'}
          size="lg"
        />
        <div className="grow">
          <header className="flex items-center justify-between">
            <h3 className="mb-1 text-sm font-semibold">{user.name}</h3>
          </header>
          <div className="mb-1 text-xs not-italic">온도 {user.temperature} · 판매 10</div>

          <LocationInfo locationName={user.location} />
        </div>
      </div>
    </section>
  );
};
