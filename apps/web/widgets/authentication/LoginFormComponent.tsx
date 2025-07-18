// LoginFormComponent.tsx

'use client';

import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';
import React from 'react';

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  email,
  password,
  error,
  isPending,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <div className="w-full max-w-sm">
      <h2 className="mb-8 text-center text-xl font-bold text-gray-800">이메일/아이디 로그인</h2>

      <form onSubmit={onSubmit} noValidate>
        <div className="mb-4">
          {' '}
          {/* 간격 조정 */}
          <Input
            id="email"
            label="이메일/아이디"
            type="email" // type을 'email'로 명시
            value={email}
            onChange={onChangeEmail}
            required
            disabled={isPending}
            placeholder="example@email.com"
          />
        </div>
        <div className="mb-5">
          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
            disabled={isPending}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

        <div className="mb-6 flex justify-center space-x-4 text-sm text-gray-500">
          {' '}
          {/* 폰트 크기 조정 */}
          <Link href="/find-id" className="transition-colors hover:text-purple-600">
            계정 찾기
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/reset-password" className="transition-colors hover:text-purple-600">
            비밀번호 찾기
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/signup" className="transition-colors hover:text-purple-600">
            회원가입
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-purple-500 font-bold text-white transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          size="lg"
          disabled={!email || !password || isPending}
        >
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
};
