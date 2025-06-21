'use client';
import { useRef } from 'react';

import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { NotificationModal } from '../../widgets/notification-modal/ui/NotificationModal';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleNotificationClick = () => {
    dialogRef.current?.showModal();
  };
  return (
    <div className="flex h-screen flex-col">
      <Header onNotificationClick={handleNotificationClick} />
      <NotificationModal dialogRef={dialogRef} />
      <div className="flex-1 overflow-y-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
