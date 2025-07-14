'use client';

import { useLogin } from '@/shared/hooks/useLogin';
import { LoginFormComponent } from '@/widgets/authentication/LoginFormComponent';
import { SignUpLinkComponent } from '@/widgets/authentication/SignUpLinkComponent';
import { SocialLoginSection } from '@/widgets/authentication/SocialLoginSection';
import { useEffect } from 'react';

const LoginPage = () => {
  const {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    resetFields,
    isPending,
    triggerLogin,
  } = useLogin();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        // Enter 키가 눌렸을 때 로그인 로직 실행
        triggerLogin();
      }
    };

    // document에 이벤트 리스너 추가
    document.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerLogin]); // triggerLogin이 변경될 때마다 이펙트 재실행

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mt mb-4 text-center text-2xl font-bold">로그인</h2>
      <LoginFormComponent
        email={email}
        password={password}
        error={error}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
        isPending={isPending}
      />
      <SocialLoginSection onSocialLoginClick={resetFields} />
      <SignUpLinkComponent />
    </div>
  );
};

export default LoginPage;
