'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';
import { EmailInputSectionProps } from '../../../types/auth/signup';
import { SignupFormComponentStyles } from './styles';

export const EmailInputSection: React.FC<EmailInputSectionProps> = ({
  email,
  onChangeEmail,
  onEmailDuplicateCheck,
  isCheckingEmail,
  emailCheckStatus,
  error,
}) => (
  <div>
    <span className={SignupFormComponentStyles.emailInputSection.label}>이메일 주소</span>
    <div className={SignupFormComponentStyles.emailInputSection.inputGroup}>
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
        className="whitespace-nowrap"
        variants="primary"
        size="md"
        disabled={!email || isCheckingEmail}
        onClick={onEmailDuplicateCheck}
      />
    </div>
  </div>
);
