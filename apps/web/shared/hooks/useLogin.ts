import { useLoginMutation } from '@/shared/api/client/authentication/useLoginMutation';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useLogin = () => {
  const router = useRouter();
  const { mutate: loginMutate, isPending, error } = useLoginMutation();

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

  // 핵심 로그인 로직을 분리
  const triggerLogin = useCallback(() => {
    loginMutate(
      { email, password },
      {
        onSuccess: () => {
          router.push('/main');
        },
        onError: (err) => {
          console.error('Login failed:', err.message);
          alert(err.message);
        },
      }
    );
  }, [email, password, loginMutate, router]);

  // 폼 제출 핸들러
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // 폼 제출의 기본 동작(페이지 새로고침)을 막기 위함
      triggerLogin();
    },
    [triggerLogin]
  );

  const resetFields = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  return {
    email,
    password,
    error: error?.message, // 에러 메시지를 반환하도록 수정
    onChangeEmail,
    onChangePassword,
    onSubmit,
    resetFields,
    isPending,
    triggerLogin, // triggerLogin 함수를 반환
  };
};
