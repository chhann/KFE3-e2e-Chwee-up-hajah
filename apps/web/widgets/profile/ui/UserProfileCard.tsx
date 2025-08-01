import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { Settings } from 'lucide-react';
import Link from 'next/link';

import { getGradeIcon } from '@/shared/lib/points/getGradeIcon';
import { getCacheBustingUrl } from '@/shared/lib/utils/avatar';
import { UserProfileType } from '@/shared/types/profile';

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
              <Settings className={styles.userInfo.settingsIcon} aria-hidden="true" />
            </Link>
          </header>
          <address className={styles.userInfo.email}>{user.email}</address>
          <LocationInfo address={user.address} addressDetail={user['address_detail']} />
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <div role="region" aria-labelledby="points-info-title">
        <h3 id="credit-info-title" className="sr-only">
          포인트 정보
        </h3>

        <div className={styles.pointsSection.wrapper}>
          <div>
            <p className={styles.pointsSection.gradeName}>등급 {user.grade || '씨앗'} </p>
            <span className={styles.pointsSection.gradeIcon}>
              {getGradeIcon(user.grade || '씨앗')}
            </span>
          </div>
          <div>
            <p className={styles.pointsSection.pointsLabel}>등급 포인트</p>
            <span className={styles.pointsSection.pointsAmount}>
              {user.points?.toLocaleString() || 0}P
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
