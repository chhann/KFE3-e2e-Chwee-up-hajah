'use client';

import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';
import { PasswordInputSectionProps } from '../../../types/auth/signup';
import { SignupFormComponentStyles } from './styles';

export const PasswordInputSection: React.FC<PasswordInputSectionProps> = ({
  password,
  confirmPassword,
  onChangePassword,
  onChangePasswordConfirm,
  passwordError,
  confirmPasswordError,
}) => (
  <>
    <div>
      <span className={SignupFormComponentStyles.passwordInputSection.label}>비밀번호</span>
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
      <span className={SignupFormComponentStyles.passwordInputSection.label}>비밀번호 확인</span>
      <Input
        type="password"
        value={confirmPassword}
        onChange={onChangePasswordConfirm}
        placeholder="비밀번호 확인"
        required
        error={confirmPasswordError}
      />
    </div>
  </>
);
