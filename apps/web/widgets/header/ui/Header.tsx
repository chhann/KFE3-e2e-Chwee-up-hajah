'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { useModalStore } from '../../../stores/modal';

import { headerStyles as styles } from '../styles/header.styles';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { setOpenModal } = useModalStore();

  const noBackButtonRoutes = ['/main'];
  const showBackButton = !noBackButtonRoutes.includes(pathname);

  return (
    <header className={styles.header}>
      {showBackButton && (
        <div className={styles.backButton.wrapper} onClick={() => router.back()}>
          <FaArrowLeft className={styles.backButton.icon} />
        </div>
      )}
      <div className={styles.buttonArea.container}>
        <Button
          variants="ghost"
          size="thinMd"
          onClick={() => setOpenModal('notification')}
          className={styles.buttonArea.notificationButton}
        >
          <h2>알림</h2>
        </Button>
        <Button
          size="thinMd"
          variants="ghost"
          onClick={() => setOpenModal('location')}
          className={styles.buttonArea.locationButton}
        >
          <h2>내 위치</h2>
        </Button>
      </div>
    </header>
  );
};
