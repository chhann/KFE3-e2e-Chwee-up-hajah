'use client';

import { SubmitButtonProps } from '@/shared/types/auth/signup';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import React from 'react';

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  email,
  username,
  password,
  confirmPassword,
  emailError,
  agreedToTerms,
}) => (
  <Button
    type="submit"
    children="회원가입"
    className="w-full"
    variants="primary"
    size="md"
    disabled={
      isSubmitting || !email || !username || !password || !confirmPassword || !agreedToTerms
    }
  />
);
