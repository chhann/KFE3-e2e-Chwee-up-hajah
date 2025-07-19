'use client';
import {
  Item,
  ItemBadge,
  ItemFooter,
  ItemTitle,
} from '@repo/ui/design-system/base-components/Item/index';
import {
  Modal,
  ModalContent,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

import { useModalStore } from '../../../shared/stores/modal';

import { locationModalStyles as styles } from '../styles/locationModal.styles';

const LocationModal = () => {
  const { closeModal } = useModalStore();

  return (
    <Modal className={styles.modal}>
      <ModalContent className={styles.content}>
        <ModalHeader onClose={closeModal} />
        <ItemBadge className={styles.badge}>
          <IoShieldCheckmarkSharp className={styles.shieldIcon} />
          <h3>현재 위치</h3>
        </ItemBadge>

        <Item>
          <ItemTitle className={styles.itemTitle}>서울시 강남구 서초동</ItemTitle>
          <ItemFooter className={styles.footer}>
            <button className={styles.resetButton} onClick={() => {}}>
              위치 재설정
            </button>
          </ItemFooter>
        </Item>
      </ModalContent>
    </Modal>
  );
};

export default LocationModal;
