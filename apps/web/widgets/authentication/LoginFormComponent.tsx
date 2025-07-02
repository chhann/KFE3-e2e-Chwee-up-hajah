// apps/web/widgets/authentication/LoginFormComponent.tsx
'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';
import React from 'react';

interface LoginFormComponentProps {
  email: string;
  password: string;
  error?: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  email,
  password,
  error,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
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
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <div className="justify-between text-center text-sm text-gray-500">
        <Link href="/reset_password" className="text-gray-500 hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
      <Button
        children="로그인"
        className="w-full"
        type="submit"
        variants="primary"
        size="md"
        disabled={!email || !password}
      />
    </form>
  );
};
