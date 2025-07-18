'use client';

import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';

// isPending, error 등의 prop 타입 정의
interface LoginFormComponentProps {
  email?: string;
  password?: string;
  error?: string;
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
    <form className="w-full" onSubmit={onSubmit}>
      <div className="mb-6">
        <Input
          id="email"
          label="이메일/아이디"
          type="text"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일 또는 아이디"
          required
        />
      </div>
      <div>
        <Input
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
      </div>
    </form>
  );
};
