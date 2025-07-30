'use client';

import { useEffect } from 'react';

import toast from 'react-hot-toast';
import { MdLogout } from 'react-icons/md';

import { useLogout } from '@/shared/hooks/useLogout';
import { useModalStore } from '@/shared/stores/modal';

import { navigationStyles } from '../profile/styles/navigation.styles';

import { logoutSectionStyles } from './styles';

export const LogoutButton = () => {
  const logoutMutation = useLogout();
  const { setOpenModal } = useModalStore();

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      toast.success('로그아웃 되었습니다.');
    }
  }, [logoutMutation.isSuccess]);

  const handleLogout = () => {
    setOpenModal('confirm', {
      title: '로그아웃',
      description: '접속 중인 아이디로 로그아웃을 하시겠습니까?',
      confirmText: '로그아웃',
      onConfirm: () => {
        logoutMutation.mutate();
      },
    });
  };

  return (
    <>
      <div onClick={handleLogout} className={logoutSectionStyles.nav}>
        <MdLogout className={logoutSectionStyles.logoutIcon} aria-hidden="true" />
        <span className={navigationStyles.link}>로그아웃</span>
      </div>
    </>
  );
};
