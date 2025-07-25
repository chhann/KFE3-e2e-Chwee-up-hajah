'use client';

import { UsernameInputSectionProps } from '@/shared/types/auth/signup';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';

export const UsernameInputSection: React.FC<UsernameInputSectionProps> = ({
  username,
  onChangeUsername,
  onUsernameDuplicateCheck,
  isCheckingUsername,
  usernameCheckStatus,
  error,
}) => (
  <div className="mb-8">
    <div className="flex items-start space-x-2">
      <Input
        type="text"
        value={username}
        onChange={onChangeUsername}
        placeholder="닉네임"
        required
        error={error}
        success={usernameCheckStatus === 'success' ? '사용 가능한 닉네임입니다.' : undefined}
      />

      <Button
        type="button"
        children="중복 확인"
        className="bg-primary-300 whitespace-nowrap rounded-md px-4 py-3 text-sm text-neutral-100"
        variants="primary"
        size="sm"
        disabled={!username || isCheckingUsername}
        onClick={onUsernameDuplicateCheck}
      />
    </div>
  </div>
);
