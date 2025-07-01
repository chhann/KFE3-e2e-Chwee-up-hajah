'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { useModalStore } from '../../../stores/modal';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenModal } = useModalStore();

  const noBackButtonRoutes = ['/main'];
  const showBackButton = !noBackButtonRoutes.includes(pathname);

  return (
    <header className="text-neutral-70 flex h-[68px] cursor-pointer items-center justify-between pl-2">
      {showBackButton && (
        <div className="text-neutral-700" onClick={() => router.back()}>
          <FaArrowLeft className="size-4" />
        </div>
      )}
      <div className="grow text-right">
        <Button
          variants="ghost"
          size="thinMd"
          onClick={() => setOpenModal('notification')}
          className="mr-1 px-2"
        >
          <h2>알림</h2>
        </Button>
        <Button
          size="thinMd"
          variants="ghost"
          onClick={() => setOpenModal('location')}
          className="px-2"
        >
          <h2>내 위치</h2>
        </Button>
      </div>
    </header>
  );
};
