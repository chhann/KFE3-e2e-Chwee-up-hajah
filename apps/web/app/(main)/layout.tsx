'use client';

import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { LocationModal, NotificationModal } from '../../widgets/modal';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <NotificationModal />
      <LocationModal />
      <div className="flex-1 overflow-y-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
