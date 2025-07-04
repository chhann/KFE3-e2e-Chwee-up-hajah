import { cn } from '@repo/ui/utils/cn';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';
import {
  modalCloseButtonIconStyle,
  modalCloseButtonStyle,
  modalContainerStyle,
  modalContentStyle,
  modalFooterStyle,
  modalHeaderStyle,
  modalHeaderTextStyle,
  modalStyle,
} from './Modal.styles';

interface Props {
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'div'>;
}

const Modal = ({ children, className, props }: Props) => {
  return (
    <div className={cn(modalContainerStyle, className)} {...props}>
      <div className={modalStyle} />
      {children}
    </div>
  );
};

const ModalContent = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn(modalContentStyle, className)} {...props}>
      {children}
    </div>
  );
};

interface ModalHeaderProps {
  onClose?: () => void;
  title?: string;
  className?: string;
}

const ModalHeader = ({ title, onClose, className }: ModalHeaderProps) => {
  return (
    <header className={cn(modalHeaderStyle, className)}>
      <h2 id="notification-title" className={modalHeaderTextStyle}>
        {title}
      </h2>
      <ModalCloseButton onClose={onClose} />
    </header>
  );
};

const ModalFooter = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn(modalFooterStyle, className)} {...props}>
      {children}
    </div>
  );
};

interface ModalCloseButtonProps {
  onClose?: () => void;
  className?: string;
}

const ModalCloseButton = ({ onClose, className = '' }: ModalCloseButtonProps) => {
  return (
    <Button
      variants="ghost"
      aria-label="알림창 닫기"
      size="thinMd"
      className={cn(modalCloseButtonStyle, className)}
      onClick={onClose}
    >
      <IoMdClose className={modalCloseButtonIconStyle} />
    </Button>
  );
};

export { Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader };
