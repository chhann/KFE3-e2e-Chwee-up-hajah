import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Modal, ModalContent } from '@repo/ui/design-system/base-components/Modal/index';

import { ModalFooter } from '../../../../../packages/ui/src/design-system/base-components/Modal/Modal';
import { useModalStore } from '../../../stores/modal';

import { locationPermissionModalStyles as styles } from '../styles/locationPermissionModal';

export const LocationPermissionModal = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen('permission')) return null;

  return (
    <Modal>
      <ModalContent className={styles.content}>
        <div className={styles.messageArea}>
          <p>위치기반 서비스를 이용하시려면</p>
          <p>사용자의 동의가 필요합니다.</p>
          <p>위치 정보 제공에 동의하시겠습니까?</p>
        </div>
        <ModalFooter className={styles.footer}>
          <Button variants="ghost" size="lg" onClick={closeModal}>
            취소
          </Button>
          <Button variants="ghost" size="lg" className={styles.agreeButton}>
            동의
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
