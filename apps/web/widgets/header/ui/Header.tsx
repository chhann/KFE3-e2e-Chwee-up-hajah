'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { useModalStore } from '../../../shared/stores/modal';

import { headerStyles as styles } from '../styles/header.styles';

import { IoNotificationsOutline } from 'react-icons/io5';
import { GrLocation } from 'react-icons/gr';

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
          <IoNotificationsOutline className={styles.buttonArea.icon} />
        </Button>
        <Button
          size="thinMd"
          variants="ghost"
          onClick={() => setOpenModal('location')}
          className={styles.buttonArea.locationButton}
        >
          <GrLocation className={styles.buttonArea.icon} />
        </Button>
      </div>
    </header>
  );
};
