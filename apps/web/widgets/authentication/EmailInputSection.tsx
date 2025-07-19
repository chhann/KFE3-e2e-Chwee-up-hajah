'use client';

import { EmailInputSectionProps } from '@/shared/types/auth/signup';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';

export const EmailInputSection: React.FC<EmailInputSectionProps> = ({
  email,
  onChangeEmail,
  onEmailDuplicateCheck,
  isCheckingEmail,
  emailCheckStatus,
  error,
}) => (
  <div className="mb-8">
    <div className="flex items-start space-x-2">
      <Input
        type="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일"
        required
        error={error}
        success={emailCheckStatus === 'success' ? '사용 가능한 이메일입니다.' : undefined}
      />

      <Button
        type="button"
        children="중복 확인"
        className="bg-primary-300 whitespace-nowrap rounded-md px-4 py-3 text-sm text-neutral-100"
        variants="primary"
        size="sm"
        disabled={!email || isCheckingEmail}
        onClick={onEmailDuplicateCheck}
      />
    </div>
  </div>
);
