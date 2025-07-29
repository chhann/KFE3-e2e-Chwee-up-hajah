'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { MdLogout } from 'react-icons/md';

import { useLogout } from '@/shared/hooks/useLogout';

import { ConfirmDialog } from '../confirm-dialog';
import { navigationStyles } from '../profile/styles/navigation.styles';

import { logoutSectionStyles } from './styles';

export const LogoutButton = () => {
  const logoutMutation = useLogout();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      toast.success('로그아웃 되었습니다.');
    }
  }, [logoutMutation.isSuccess]);

  return (
    <>
      <div onClick={() => setShowDialog((prev) => !prev)} className={logoutSectionStyles.nav}>
        <MdLogout className={logoutSectionStyles.logoutIcon} aria-hidden="true" />
        <span className={navigationStyles.link}>로그아웃</span>
      </div>
      <ConfirmDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => logoutMutation.mutate()}
        title="로그아웃"
        description="접속 중인 아이디로 로그아웃을 하시겠습니까?"
        confirmText="로그아웃"
      />
    </>
  );
};
