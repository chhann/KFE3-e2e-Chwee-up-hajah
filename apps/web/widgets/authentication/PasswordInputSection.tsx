'use client';

import { PasswordInputSectionProps } from '@/shared/types/auth/signup';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';

export const PasswordInputSection: React.FC<PasswordInputSectionProps> = ({
  password,
  confirmPassword,
  onChangePassword,
  onChangePasswordConfirm,
  passwordError,
  confirmPasswordError,
}) => (
  <div className="mb-8">
    <div className="mb-4">
      <Input
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        required
        error={passwordError}
      />
    </div>
    <div>
      <Input
        type="password"
        value={confirmPassword}
        onChange={onChangePasswordConfirm}
        placeholder="비밀번호 확인"
        required
        error={confirmPasswordError}
      />
    </div>
  </div>
);
