import { cn } from '@repo/ui/utils/cn';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../Button';
import { modalStyle } from './Modal.styles';

interface Props {
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'div'>;
}

const Modal = ({ children, className, props }: Props) => {
  return (
    <div className={cn(modalStyle.modalContainerStyle, className)} {...props}>
      <div className={modalStyle.modalBasickStyle} />
      {children}
    </div>
  );
};

const ModalContent = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn(modalStyle.modalContentStyle, className)} {...props}>
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
    <header className={cn(modalStyle.modalHeaderStyle, className)}>
      <h2 id="notification-title" className={modalStyle.modalHeaderTextStyle}>
        {title}
      </h2>
      <ModalCloseButton onClose={onClose} />
    </header>
  );
};

const ModalFooter = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn(modalStyle.modalFooterStyle, className)} {...props}>
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
      className={cn(modalStyle.modalCloseButtonStyle, className)}
      onClick={onClose}
    >
      <IoMdClose className={modalStyle.modalCloseButtonIconStyle} />
    </Button>
  );
};

export { Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader };
