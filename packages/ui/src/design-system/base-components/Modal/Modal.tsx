import { cn } from '@repo/ui/utils/cn';
import { Button } from '../Button';
import { IoMdClose } from 'react-icons/io';

interface Props {
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'div'>;
}

const Modal = ({ children, className, props }: Props) => {
  return (
    <div
      className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}
      {...props}
    >
      <div className="absolute inset-0 z-50 backdrop-blur-sm" />
      {children}
    </div>
  );
};

const ModalContent = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn('relative z-50 overflow-y-auto rounded-[10px]', className)} {...props}>
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
    <header className={cn('mb-2 flex w-full items-center justify-between', className)}>
      <h2 id="notification-title" className="text-lg font-semibold text-gray-900">
        {title}
      </h2>
      <ModalCloseButton onClose={onClose} />
    </header>
  );
};

const ModalFooter = ({ children, className = '', props }: Props) => {
  return (
    <div className={cn('flex flex-col-reverse', className)} {...props}>
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
      variants="transparent"
      aria-label="알림창 닫기"
      size="thinMd"
      className={cn('absolute right-2 top-2 px-1 py-1 hover:bg-gray-200', className)}
      onClick={onClose}
    >
      <IoMdClose className="size-5" />
    </Button>
  );
};

export { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalFooter };
