import { create } from 'zustand';

type ModalType = 'notification' | 'location' | 'auth' | null;

interface ModalStore {
  openModal: ModalType;
  setOpenModal: (modal: ModalType) => void;
  closeModal: () => void;
  isModalOpen: (modal: ModalType) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  openModal: null,

  setOpenModal: (modal) => set({ openModal: modal }),

  closeModal: () => set({ openModal: null }),

  isModalOpen: (modal) => get().openModal === modal,
}));
