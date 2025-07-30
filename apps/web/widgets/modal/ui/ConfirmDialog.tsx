'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { confirmDialogStyles } from '../styles/confirmDialog';
import { useModalStore } from '@/shared/stores/modal';

export interface ComfirmDialogProps {
  onClose?: () => void; // ModalProvider에서 closeModal 전달
  onConfirm?: () => void; // ModalProvider에서 전달받음
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  title = 'Are you absolutely sure?',
  description,
  confirmText = 'Continue',
  cancelText = '취소',
}: ComfirmDialogProps) => {
  const { closeModal, confirmDialogProps } = useModalStore(); // Zustand에서 상태와 액션 가져오기

  // ConfirmDialogProps에 직접 전달된 props와 Zustand의 props를 병합 (Zustand 값이 우선)
  const currentTitle = confirmDialogProps.title || title;
  const currentDescription = confirmDialogProps.description || description;
  const currentConfirmText = confirmDialogProps.confirmText || confirmText;
  const currentCancelText = confirmDialogProps.cancelText || cancelText;
  const currentOnConfirm = confirmDialogProps.onConfirm; // onConfirm은 외부에서 주입된 것이므로 병합하지 않음

  const handleConfirm = () => {
    if (currentOnConfirm) {
      currentOnConfirm(); // Zustand에서 가져온 onConfirm 실행
    }
    closeModal(); // Zustand의 closeModal 실행
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={confirmDialogStyles.backdrop} onClick={handleBackdropClick}>
      <div className={confirmDialogStyles.container}>
        <h3 className={confirmDialogStyles.title}>{currentTitle}</h3>

        {currentDescription && (
          <p className={confirmDialogStyles.description}>{currentDescription}</p>
        )}

        <div className={confirmDialogStyles.buttonContainer}>
          <Button
            variants="custom"
            onClick={handleCancel}
            className={confirmDialogStyles.cancelButton}
          >
            {currentCancelText}
          </Button>
          <Button
            variants="custom"
            onClick={handleConfirm}
            className={confirmDialogStyles.confirmButton}
          >
            {currentConfirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
