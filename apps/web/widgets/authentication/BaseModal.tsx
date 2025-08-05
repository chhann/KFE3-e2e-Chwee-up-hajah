import { Button } from '@repo/ui/design-system/base-components/Button/index';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';

interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  customFooter?: React.ReactNode; // 새로운 prop 추가
}

export const BaseModal = ({ title, children, onClose, customFooter }: BaseModalProps) => {
  return (
    <Modal>
      <ModalContent className="w-11/12 max-w-lg transform rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out">
        <ModalHeader
          title={title}
          onClose={onClose}
          className="border-b border-gray-200 px-6 py-4 text-xl font-semibold text-gray-800 sm:px-8"
        />
        <div className="p-2 sm:p-4">
          <div className="max-h-[65vh] w-full overflow-y-auto rounded-lg border border-gray-200 bg-gray-50/50 p-4 sm:p-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
            {children}
          </div>
        </div>
        <ModalFooter className="flex justify-end border-t border-gray-200 px-6 py-5 sm:px-8">
          {customFooter ? (
            customFooter
          ) : (
            <Button
              onClick={onClose}
              variants="primary"
              className="px-6 py-3 text-base sm:px-8 sm:text-lg"
            >
              확인
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
