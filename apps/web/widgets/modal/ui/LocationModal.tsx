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

import { useModalStore } from '../../../stores/modal';

export const LocationModal = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen('location')) return null;

  return (
    <Modal className="pt-15 items-start">
      <ModalContent className="h-content w-[340px] bg-neutral-500 p-4 pb-0 text-white">
        <ModalHeader onClose={closeModal} />
        <ItemBadge className="text-white">
          <IoShieldCheckmarkSharp className="mr-1 size-5 text-green-500" />
          <h3>현재 위치</h3>
        </ItemBadge>

        <Item>
          <ItemTitle className="text-white">서울시 강남구 서초동</ItemTitle>
          <ItemFooter className="flex items-end justify-end">
            <button
              className="cursor-pointer text-[10px] text-blue-300 hover:text-blue-200"
              onClick={() => {}}
            >
              위치 재설정
            </button>
          </ItemFooter>
        </Item>
      </ModalContent>
    </Modal>
  );
};
