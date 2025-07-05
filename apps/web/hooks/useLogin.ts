'use client';

import { useCallback, useState, useEffect } from 'react';
import { useLoginMutation } from './mutations/useLoginMutation';
import { useAuthStore } from '../stores/auth';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error: mutationError, isError } = useLoginMutation();
  const { error: authError, setError: setAuthError } = useAuthStore();

  useEffect(() => {
    // mutation 훅에서 발생한 에러를 zustand 스토어에 반영
    if (isError && mutationError) {
      setAuthError(mutationError.message);
    } else {
      setAuthError(null);
    }
  }, [isError, mutationError, setAuthError]);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 이메일, 비밀번호로 로그인 뮤테이션 실행
      login({ email, password });
    },
    [email, password, login]
  );

  const resetFields = useCallback(() => {
    setEmail('');
    setPassword('');
    setAuthError(null);
  }, [setAuthError]);

  return {
    email,
    password,
    error: authError, // UI에 표시될 에러
    isPending, // 로딩 상태
    onChangeEmail,
    onChangePassword,
    onSubmit,
    resetFields,
  };
};
