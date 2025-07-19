'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useModalStore } from '@/shared/stores/modal';

const NotificationModal = dynamic(() => import('@/widgets/modal/ui/NotificationModal'), {
  ssr: false,
});
const LocationModal = dynamic(() => import('@/widgets/modal/ui/LocationModal'));

function ModalProvider() {
  const { isModalOpen } = useModalStore();

  return (
    <>
      {isModalOpen('notification') && (
        <Suspense fallback={null}>
          <NotificationModal />
        </Suspense>
      )}

      {isModalOpen('location') && (
        <Suspense fallback={null}>
          <LocationModal />
        </Suspense>
      )}
    </>
  );
}

export default ModalProvider;
