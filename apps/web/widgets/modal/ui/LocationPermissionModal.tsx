import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Modal, ModalContent } from '@repo/ui/design-system/base-components/Modal/index';

import { useModalStore } from '../../../stores/modal';
import { ModalFooter } from '../../../../../packages/ui/src/design-system/base-components/Modal/Modal';

export const LocationPermissionModal = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen('permission')) return null;

  return (
    <Modal>
      <ModalContent className="h-content border-1 border-neutral-30 w-[295px] border-solid bg-white">
        <div className="flex w-full flex-col justify-center space-y-2 py-[70px] text-center text-sm font-semibold">
          <p>위치기반 서비스를 이용하시려면</p>
          <p>사용자의 동의가 필요합니다.</p>
          <p>위치 정보 제공에 동의하시겠습니까?</p>
        </div>
        <ModalFooter className="border-1 border-neutral-30 w-full border-b-0 border-l-0 border-r-0 border-solid">
          <Button variants="ghost" size="lg" onClick={closeModal}>
            취소
          </Button>
          <Button variants="ghost" size="lg" className="rounded-none bg-black text-white">
            동의
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
