import { useModalStore } from '../../../stores/modal';
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

export const LocationModal = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen('location')) return null;

  return (
    <Modal className="pt-15 items-start">
      <ModalContent className="bg-neutral-40 h-content w-[340px] p-4 pb-0 text-white">
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
