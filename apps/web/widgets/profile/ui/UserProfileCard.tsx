import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';

import { getCacheBustingUrl } from '@/lib/utils/avatar';
import { UserProfileType } from '@/types/profile';
import { userProfileCardStyles as styles } from '../styles/useProfileCard.styles';

export const UserProfileCard = ({ user }: { user: UserProfileType }) => {
  const avatarSrc = getCacheBustingUrl(user.avatar);

  return (
    <section className={styles.container} aria-labelledby="profile-header-title">
      <h2 id="profile-header-title" className="sr-only">
        사용자 프로필 정보
      </h2>

      <div className={styles.profileSection}>
        <Avatar src={avatarSrc} alt={user.username} name={user.username} size="lg" />

        {/* ==================== UserProfileInfo  ==================== */}
        <div className={styles.userInfo.wrapper}>
          <header className={styles.userInfo.header}>
            <h3 className={styles.userInfo.username}>{user.username}</h3>

            <Link href="/profile/update">
              <IoSettingsOutline className={styles.userInfo.settingsIcon} aria-hidden="true" />
            </Link>
          </header>
          <address className={styles.userInfo.email}>{user.email}</address>

          <LocationInfo address={user.address} addressDetail={user['address_detail']} />
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <div role="region" aria-labelledby="credit-info-title">
        <h3 id="credit-info-title" className="sr-only">
          크레딧 정보
        </h3>

        <span className={styles.creditSection.temperature}>--°C</span>

        <div className={styles.creditSection.creditInfo}>
          <span className={styles.creditSection.creditAmount}>--</span>
          <span className={styles.creditSection.creditLabel}>크레딧</span>
        </div>
      </div>
    </section>
  );
};
