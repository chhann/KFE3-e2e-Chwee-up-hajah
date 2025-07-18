'use client';

import { useLogin } from '@/shared/hooks/useLogin';
import { LoginFormComponent } from '@/widgets/authentication/LoginFormComponent';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginPage = () => {
  const {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    isPending,
    triggerLogin,
  } = useLogin();

  useEffect(() => {
    // Enter 키로 로그인하는 로직은 그대로 유지합니다.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isPending) {
        triggerLogin();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerLogin, isPending]);

  return (
    <div className="bg-background-light flex min-h-screen w-full flex-col items-center pt-20">
      <h2 className="mb-10 text-2xl font-bold text-gray-800">이메일/아이디 로그인</h2>
      <div className="w-full max-w-xs px-4 sm:px-0">
        <LoginFormComponent
          email={email}
          password={password}
          error={error}
          onSubmit={onSubmit}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
        />
        <div className="mt-4">{error && <p className="mb-4 text-sm text-red-600">{error}</p>}</div>
        <div className="my-6 flex justify-center space-x-3 text-sm text-gray-500">
          {/* 링크 호버 색상을 파스텔 보라색 계열로 변경 */}
          <Link href="/find-id" className="transition-colors hover:text-violet-600">
            계정 찾기
          </Link>
          <span className="text-primary-200">|</span>
          <Link href="/reset-password" className="transition-colors hover:text-violet-600">
            비밀번호 찾기
          </Link>
          <span className="text-primary-200">|</span>
          <Link href="/signup" className="transition-colors hover:text-violet-600">
            회원가입
          </Link>
        </div>
        <Button
          onClick={() => triggerLogin()}
          // 버튼 배경색을 파스텔 보라색 계열로 변경
          className="w-full bg-violet-500 text-white hover:bg-violet-600"
          size="lg"
          disabled={!email || !password || isPending}
          variants="custom"
        >
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
