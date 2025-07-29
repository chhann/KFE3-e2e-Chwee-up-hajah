'use client';

import { useEffect } from 'react';

import toast from 'react-hot-toast';

import { useLogout } from '@/shared/hooks/useLogout';

import { logoutButtonStyles } from './styles';

export const LogoutButton = () => {
  const logoutMutation = useLogout();

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      toast.success('로그아웃 되었습니다.');
    }
  }, [logoutMutation.isSuccess]);

  return (
    <button
      onClick={() => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
          logoutMutation.mutate();
        }
        return;
      }}
      disabled={logoutMutation.isPending}
      className={logoutButtonStyles.button}
    >
      {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
};
