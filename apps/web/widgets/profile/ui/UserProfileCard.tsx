import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';

type UserMetadata = NonNullable<User['user_metadata']>;

export const UserProfileCard = ({ user }: { user: UserMetadata }) => {
  return (
    <section
      className="mb-7 rounded-[6px] bg-[var(--color-primary-50)] px-[18px] py-4"
      aria-labelledby="profile-header-title"
    >
      <h2 id="profile-header-title" className="sr-only">
        사용자 프로필 정보
      </h2>

      <div className="flex items-center gap-6">
        <Avatar
          src={user.profileImageUrl}
          alt={`${user.name} 프로필 이미지`}
          name={user.name || '사용자'}
          size="lg"
        />

        {/* ==================== UserProfileInfo  ==================== */}
        <div className="w-[220px]">
          <header className="flex items-center justify-between">
            <h3 className="mb-1 text-sm font-semibold">{user.username}</h3>

            <Link href="/">
              <IoSettingsOutline className="size-4" aria-hidden="true" />
            </Link>
          </header>
          <address className="mb-1 text-xs not-italic">{user.email}</address>

          <LocationInfo address={user.address} addressDetail={user.addressDetail} />
        </div>
      </div>

      <hr className="my-4 border-white" aria-hidden="true" />

      <div role="region" aria-labelledby="credit-info-title">
        <h3 id="credit-info-title" className="sr-only">
          크레딧 정보
        </h3>

        <span className="text-sm">--{user.temperature}°C</span>

        <div className="flex items-center text-sm">
          <span className="mr-1 text-lg font-semibold">--{user.credits?.toLocaleString()}</span>
          <span>크레딧</span>
        </div>
      </div>
    </section>
  );
};
