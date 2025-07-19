'use client';

import { AddressInputSectionProps } from '@/shared/types/auth/signup';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Script from 'next/script';
import React, { useRef } from 'react';
import { SignupFormComponentStyles } from './styles';

declare global {
  interface Window {
    daum: any;
  }
}

interface DaumPostcodeData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
}

export const AddressInputSection: React.FC<AddressInputSectionProps> = ({
  address,
  addressDetail,
  onChangeAddress,
  onChangeAddressDetail,
  error,
}) => {
  const addressDetailRef = useRef<HTMLInputElement>(null);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ' (' + extraAddress + ')' : '';
        }

        // 주소 정보를 부모 컴포넌트로 전달
        onChangeAddress({ target: { value: fullAddress } } as React.ChangeEvent<HTMLInputElement>);
        // 상세 주소 입력란으로 포커스 이동
        addressDetailRef.current?.focus();
      },
    }).open();
  };

  return (
    <div className="mb-8">
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <div className="mb-4">
        <div className={SignupFormComponentStyles.addressInputSection.inputGroup}>
          <Input
            type="text"
            value={address}
            onChange={onChangeAddress}
            placeholder="주소를 입력해주세요"
            required={false}
            error={error}
            readOnly // 사용자가 직접 수정하지 못하도록 설정
          />
          <Button
            type="button"
            onClick={handleAddressSearch}
            className="bg-primary-300 whitespace-nowrap rounded-md px-4 py-3 text-sm text-neutral-100"
            variants="primary"
            size="md"
          >
            검색
          </Button>
        </div>
      </div>
      <div>
        <Input
          ref={addressDetailRef}
          type="text"
          value={addressDetail}
          onChange={onChangeAddressDetail}
          placeholder="상세 주소"
          required={false}
        />
      </div>
    </div>
  );
};
