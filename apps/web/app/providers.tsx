'use client';

import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRestoreSessionQuery } from '@/hooks/queries/useRestoreSessionQuery';
import { useAuthStore } from '@/stores/auth';

const queryClient = new QueryClient();

const SessionInitializer = () => {
  const { data, isSuccess, isError } = useRestoreSessionQuery();
  const { setSession, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return; // Zustand 스토어가 준비될 때까지 기다립니다.

    if (isSuccess && data) {
      setSession(data.userId);
    } else if (isError) {
      // 세션 복원 실패 시 (예: 토큰 만료) 로그아웃 상태로 설정
      setSession(null);
    }
  }, [isSuccess, isError, data, setSession, isHydrated]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionInitializer />
      {children}
    </QueryClientProvider>
  );
};
