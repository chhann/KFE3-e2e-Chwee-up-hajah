'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';
import { UsernameInputSectionProps } from '../../../types/auth/signup';

export const UsernameInputSection: React.FC<UsernameInputSectionProps> = ({
  username,
  onChangeUsername,
  onUsernameDuplicateCheck,
  isCheckingUsername,
  usernameCheckStatus,
  error,
}) => (
  <div>
    <span className="text-sm text-gray-500">닉네임</span>
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
        className="whitespace-nowrap"
        variants="primary"
        size="md"
        disabled={!username || isCheckingUsername}
        onClick={onUsernameDuplicateCheck}
      />
    </div>
  </div>
);
