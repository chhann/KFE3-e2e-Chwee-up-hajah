
import { describe, it, expect, beforeEach } from 'vitest';
import { useModalStore } from './modal';

describe('useModalStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 상태를 초기화합니다.
    useModalStore.setState({ openModal: null });
  });

  it('should have null as the initial openModal state', () => {
    const { openModal } = useModalStore.getState();
    expect(openModal).toBeNull();
  });

  it('should set the openModal state to a specific modal type', () => {
    const { setOpenModal } = useModalStore.getState();
    setOpenModal('notification');
    const { openModal } = useModalStore.getState();
    expect(openModal).toBe('notification');
  });

  it('should reset the openModal state to null on closeModal', () => {
    const { setOpenModal, closeModal } = useModalStore.getState();
    // 먼저 모달을 엽니다.
    setOpenModal('location');
    // 그 다음 모달을 닫습니다.
    closeModal();
    const { openModal } = useModalStore.getState();
    expect(openModal).toBeNull();
  });

  it('should return true from isModalOpen if the specified modal is open', () => {
    const { setOpenModal, isModalOpen } = useModalStore.getState();
    setOpenModal('permission');
    expect(isModalOpen('permission')).toBe(true);
  });

  it('should return false from isModalOpen if a different modal is open', () => {
    const { setOpenModal, isModalOpen } = useModalStore.getState();
    setOpenModal('notification');
    expect(isModalOpen('permission')).toBe(false);
  });

  it('should return false from isModalOpen if no modal is open', () => {
    const { isModalOpen } = useModalStore.getState();
    expect(isModalOpen('notification')).toBe(false);
  });
});
