'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';

import { confirmDialogStyles } from '../styles';

export interface ComfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'destructive' | 'default';
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you absolutely sure?',
  description,
  confirmText = 'Continue',
  cancelText = '취소',
  variant = 'default',
}: ComfirmDialogProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={confirmDialogStyles.backdrop} onClick={handleBackdropClick}>
      <div className={confirmDialogStyles.container}>
        <h3 className={confirmDialogStyles.title}>{title}</h3>

        {description && <p className={confirmDialogStyles.description}>{description}</p>}

        <div className={confirmDialogStyles.buttonContainer}>
          <Button
            variants="custom"
            onClick={handleCancel}
            className={confirmDialogStyles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variants="custom"
            onClick={handleConfirm}
            className={confirmDialogStyles.confirmButton}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
