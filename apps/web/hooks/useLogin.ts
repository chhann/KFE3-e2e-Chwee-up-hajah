// hooks/useLogin.ts
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useAuthStore } from '../stores/auth';

export const useLogin = () => {
  const router = useRouter();
  const { login, error } = useAuthStore();

  // 이메일과 비밀번호 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // input 상태 변경 핸들러
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  // 로그인 요청
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await login(email, password); // zustand의 login 호출

      // 상태에서 isAuthenticated 검사 후 대시보드 이동
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        router.push('/main');
      }
    },
    [email, password, login, router]
  );

  const resetFields = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  return {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    resetFields,
  };
};
