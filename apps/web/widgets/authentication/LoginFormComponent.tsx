// apps/web/widgets/authentication/LoginFormComponent.tsx
'use client';

import { LoginFormComponentProps } from '@/shared/types/auth/login';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';
import React from 'react';
import { LoginFormComponentStyles } from './styles';

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  email,
  password,
  error,
  onSubmit,
  onChangeEmail,
  onChangePassword,
  isPending, // 추가
}) => {
  return (
    <form className={LoginFormComponentStyles.form} onSubmit={onSubmit}>
      <Input
        type="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일 주소"
        required
        leftIcon="email"
      />
      <Input
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        required
        leftIcon="password"
      />

      {/** 에러 메시지 */}
      {error && <p className={LoginFormComponentStyles.error}>{error}</p>}

      <div className={LoginFormComponentStyles.reset_password}>
        <Link href="/reset_password" className={LoginFormComponentStyles.reset_password_link}>
          비밀번호를 잊으셨나요?
        </Link>
      </div>
      <Button
        children="로그인"
        className="w-full"
        type="submit"
        variants="primary"
        size="md"
        disabled={!email || !password || isPending} // isPending 추가
      />
    </form>
  );
};
