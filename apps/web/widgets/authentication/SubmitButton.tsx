'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import React from 'react';
import { SubmitButtonProps } from '../../../types/auth/signup';

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  email,
  username,
  password,
  confirmPassword,
  emailError,
}) => (
  <Button
    type="submit"
    children="회원가입"
    className="w-full"
    variants="primary"
    size="md"
    error={emailError ?? ''}
    disabled={isSubmitting || !email || !username || !password || !confirmPassword}
  />
);
