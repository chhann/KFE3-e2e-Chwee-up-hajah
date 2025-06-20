// hooks/useLogin.ts
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { LoginService } from '../features/authentication/api/login';

export const useLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 이메일 변경
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  // 비밀번호 변경
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  // 로그인 요청
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');

      try {
        await LoginService.login(email, password);
        router.push('/dashboard'); // 로그인 성공 시 대시보드로 이동
      } catch (err: any) {
        setError(err.message || '로그인에 실패했습니다.');
      }
    },
    [email, password, router]
  );

  return {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  };
};
