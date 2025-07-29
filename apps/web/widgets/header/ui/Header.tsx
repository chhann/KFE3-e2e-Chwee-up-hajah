'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { ArrowLeft, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useModalStore } from '../../../shared/stores/modal';
import { headerStyles as styles } from '../styles/header.styles';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenModal } = useModalStore();

  // 1. 현재 경로가 /main인지 확인합니다.
  const isMainPage = pathname === '/main';

  const noBackButtonRoutes = ['/main'];
  const showBackButton = !noBackButtonRoutes.includes(pathname);

  // 2. 조건부 스타일 클래스를 정의합니다.
  const headerBgClass = isMainPage ? 'bg-[#484848]' : '';
  const mainPageTextClass = isMainPage ? 'text-white' : '!text-[#484848]';

  return (
    <header className={`${styles.header} ${headerBgClass}`}>
      <div className="flex w-1/4 items-center pl-2">
        {showBackButton && (
          <div className={styles.backButton.wrapper} onClick={() => router.back()}>
            <ArrowLeft className={styles.backButton.icon} />
          </div>
        )}
        {!showBackButton && (
          <Link href="/main" className="flex items-center gap-1">
            <img src="/TA.png" alt="Logo" className="h-8 w-auto" />
            {/* 3. '타임옥션' 텍스트에 조건부 클래스를 적용합니다. */}
            <div className={`whitespace-nowrap text-lg font-bold ${mainPageTextClass}`}>
              타임옥션
            </div>
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
          {/* 4. 알림 아이콘에 조건부 클래스를 적용합니다. */}
          <Bell className={`${styles.buttonArea.icon} ${mainPageTextClass}`} />
        </Button>

        <Link href="/auction/auction-list">
          <Button variants="ghost" size="thinMd" className={styles.buttonArea.searchButton}>
            {/* 5. 검색 아이콘에 조건부 클래스를 적용합니다. */}
            <Search className={`${styles.buttonArea.icon} ${mainPageTextClass}`} />
          </Button>
        </Link>
      </div>
    </header>
  );
};
