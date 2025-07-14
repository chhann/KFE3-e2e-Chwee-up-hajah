'use client';

import { AddressInputSectionProps } from '@/shared/types/auth/signup';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import React from 'react';
import { SignupFormComponentStyles } from './styles';

export const AddressInputSection: React.FC<AddressInputSectionProps> = ({
  address,
  addressDetail,
  onChangeAddress,
  onChangeAddressDetail,
  onAddressSearch,
  error,
}) => (
  <>
    <div>
      <span className={SignupFormComponentStyles.addressInputSection.label}>주소</span>
      <div className={SignupFormComponentStyles.addressInputSection.inputGroup}>
        <Input
          type="text"
          value={address}
          onChange={onChangeAddress}
          placeholder="주소를 입력해주세요"
          required={false}
          error={error}
        />
        <Button
          type="button"
          children="검색"
          className="whitespace-nowrap"
          variants="primary"
          size="md"
          onClick={onAddressSearch}
        />
      </div>
    </div>
    <div>
      <span className={SignupFormComponentStyles.addressInputSection.label}>상세 주소</span>
      <Input
        type="text"
        value={addressDetail}
        onChange={onChangeAddressDetail}
        placeholder="상세 주소"
        required={false}
      />
    </div>
  </>
);
