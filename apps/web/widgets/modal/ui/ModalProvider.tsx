'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { useModalStore } from '@/shared/stores/modal';

const NotificationModal = dynamic(() => import('@/widgets/modal/ui/NotificationModal'), {
  ssr: false,
});

const ConfirmDialog = dynamic(() => import('@/widgets/modal/ui/ConfirmDialog'), {
  ssr: false,
});

const ModalProvider = () => {
  const { isModalOpen, confirmDialogProps, closeModal } = useModalStore();

  return (
    <>
      {isModalOpen('notification') && (
        <Suspense fallback={null}>
          <NotificationModal />
        </Suspense>
      )}

      {/* ConfirmDialog 추가 */}
      {isModalOpen('confirm') && (
        <Suspense fallback={null}>
          <ConfirmDialog
            isOpen={true} // 항상 true로 설정, Zustand 상태로 제어
            onClose={closeModal} // Zustand의 closeModal 사용
            onConfirm={confirmDialogProps.onConfirm || (() => {})} // onConfirm 함수 전달
            title={confirmDialogProps.title}
            description={confirmDialogProps.description}
            confirmText={confirmDialogProps.confirmText}
            cancelText={confirmDialogProps.cancelText}
            variant={confirmDialogProps.variant}
          />
        </Suspense>
      )}
    </>
  );
};

export default ModalProvider;
