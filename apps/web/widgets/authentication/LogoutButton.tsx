'use client';

import { useLogout } from '@/shared/hooks/useLogout';
import { logoutButtonStyles } from './styles';

export const LogoutButton = () => {
  const logoutMutation = useLogout();

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className={logoutButtonStyles.button}
    >
      {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
};
