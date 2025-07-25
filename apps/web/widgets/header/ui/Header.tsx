'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { useModalStore } from '../../../shared/stores/modal';

import { headerStyles as styles } from '../styles/header.styles';

import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { IoLocationOutline, IoNotificationsOutline } from 'react-icons/io5';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { setOpenModal } = useModalStore();

  const noBackButtonRoutes = ['/main'];
  const showBackButton = !noBackButtonRoutes.includes(pathname);

  return (
    <header className={styles.header}>
      <div className="flex w-1/4 items-center pl-2">
        {showBackButton && (
          <div className={styles.backButton.wrapper} onClick={() => router.back()}>
            <FaArrowLeft className={styles.backButton.icon} />
          </div>
        )}
        {!showBackButton && (
          <Link href="/main" className="flex items-center gap-1">
            <img src="/TA.png" alt="Logo" className="h-8 w-auto" />
            <h1 className="whitespace-nowrap text-lg font-bold">타임옥션</h1>
          </Link>
        )}
      </div>
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
          <IoLocationOutline className={styles.buttonArea.icon} />
        </Button>

        <Link href="/auction/auction-list">
          <Button variants="ghost" size="thinMd" className={styles.buttonArea.searchButton}>
            <GoSearch className={styles.buttonArea.icon} />
          </Button>
        </Link>
      </div>
    </header>
  );
};
