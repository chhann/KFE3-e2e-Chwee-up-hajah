import { create } from 'zustand';

type ModalType = 'notification' | 'confirm' | null; // 'confirm' 타입 추가
interface ConfirmDialogState {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void; // Confirm 시 실행될 콜백 함수
}
interface ModalStore {
  openModal: ModalType;
  confirmDialogProps: ConfirmDialogState; // ConfirmDialog의 props를 위한 상태
  setOpenModal: (modal: ModalType, props?: ConfirmDialogState) => void; // props 인자 추가
  closeModal: () => void;
  isModalOpen: (modal: ModalType) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  openModal: null,
  confirmDialogProps: {},

  setOpenModal: (modal, props) => {
    set({
      openModal: modal,
      // 'confirm' 모달일 경우에만 props를 저장
      confirmDialogProps: modal === 'confirm' ? props : {},
    });
  },

  closeModal: () => set({ openModal: null, confirmDialogProps: {} }), // 닫을 때 props 초기화

  isModalOpen: (modal) => get().openModal === modal,
}));
