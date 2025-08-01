'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { cn } from '@repo/ui/utils/cn';
import { ArrowLeft, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/stores/auth';

import { useModalStore } from '../../../shared/stores/modal';
import { headerStyles as styles } from '../styles/header.styles';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenModal } = useModalStore();
  const { userId } = useAuthStore();

  const noBackButtonRoutes = ['/main'];
  const showBackButton = window.history.length === 1 || !noBackButtonRoutes.includes(pathname);

  // 2. 조건부 스타일 클래스를 정의합니다.
  const headerBgClass = 'bg-[#fdfdfd]';
  const mainPageTextClass = 'text-[#484848]';

  const handleBackButtonClick = () => {
    const historyLength = window.history.length;
    // 히스토리에 이전 페이지가 없는 경우 (예: Push 알림)
    if (historyLength <= 1) {
      // 뒤로 가기 대신 메인 페이지로 리디렉션
      router.replace('/main');
    } else {
      // 히스토리에 이전 페이지가 있는 경우
      router.back();
    }
  };
  return (
    <header className={cn(styles.header, headerBgClass)}>
      <div className="flex w-1/4 items-center">
        {showBackButton ? (
          <Button
            variants="ghost"
            size="thinMd"
            onClick={handleBackButtonClick}
            className={styles.buttonArea.button}
          >
            <ArrowLeft className={cn(styles.buttonArea.icon, mainPageTextClass)} />
          </Button>
        ) : (
          !showBackButton && (
            <Link href="/main" className="flex items-center gap-1">
              <img src="/TA.webp" alt="Logo" className="h-8 w-auto" />
              {/* 3. '타임옥션' 텍스트에 조건부 클래스를 적용합니다. */}
              <div className={cn('whitespace-nowrap text-lg font-bold', mainPageTextClass)}>
                타임옥션
              </div>
            </Link>
          )
        )}
      </div>
      <div className={styles.buttonArea.container}>
        {pathname !== '/hotdeal' && (
          <Link href="/auction/auction-list">
            <Button variants="ghost" size="thinMd" className={styles.buttonArea.button}>
              {/* 5. 검색 아이콘에 조건부 클래스를 적용합니다. */}
              <Search className={cn(styles.buttonArea.icon, mainPageTextClass)} />
            </Button>
          </Link>
        )}

        {userId ? (
          <Button
            variants="ghost"
            size="thinMd"
            onClick={() => setOpenModal('notification')}
            className={styles.buttonArea.button}
          >
            {/* 4. 알림 아이콘에 조건부 클래스를 적용합니다. */}
            <Bell className={cn(styles.buttonArea.icon, mainPageTextClass)} />
          </Button>
        ) : (
          <Button variants="ghost" size="thinMd" onClick={() => router.replace('/login')}>
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};
