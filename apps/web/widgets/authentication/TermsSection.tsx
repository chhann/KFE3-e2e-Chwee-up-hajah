'use client';

import { UseSignupReturn } from '@/shared/types/auth/types';
import React from 'react';
// CustomCheckbox 컴포넌트 경로가 다르다면 실제 경로로 수정해주세요.
import { CustomCheckbox } from '@repo/ui/design-system/base-components/CustomCheckbox/index';

export const TermsSection = (
  props: Pick<
    UseSignupReturn,
    | 'agreedToTermsOfService'
    | 'onChangeAgreedToTermsOfService'
    | 'agreedToPrivacyPolicy'
    | 'onChangeAgreedToPrivacyPolicy'
    | 'agreedToMarketing'
    | 'onChangeAgreedToMarketing'
  > & { openTermsModal: () => void }
) => {
  const { agreedToTermsOfService, agreedToPrivacyPolicy, agreedToMarketing, openTermsModal } =
    props;

  // 전체 동의 상태 결정 (필수 항목 2개 + 선택 항목 1개)
  const isAllAgreed = agreedToTermsOfService && agreedToPrivacyPolicy && agreedToMarketing;

  // 전체 동의 클릭 핸들러
  const handleAllAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // 모든 동의 상태를 한 번에 변경
    const syntheticEvent = {
      target: { checked },
    } as React.ChangeEvent<HTMLInputElement>;
    props.onChangeAgreedToTermsOfService(syntheticEvent);
    props.onChangeAgreedToPrivacyPolicy(syntheticEvent);
    props.onChangeAgreedToMarketing(syntheticEvent);
  };

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-4">
      <CustomCheckbox
        id="all-terms"
        label="아래 약관에 모두 동의합니다."
        checked={isAllAgreed}
        onChange={handleAllAgreeChange}
        isEmphasized // 텍스트 강조
      />
      <hr className="border-t border-gray-200" />
      <CustomCheckbox
        id="terms-of-service"
        label="이용 약관 동의 (필수)"
        checked={agreedToTermsOfService}
        onChange={props.onChangeAgreedToTermsOfService}
        onDetailClick={openTermsModal}
      />
      <CustomCheckbox
        id="privacy-policy"
        label="개인정보 수집 동의 (필수)"
        checked={agreedToPrivacyPolicy}
        onChange={props.onChangeAgreedToPrivacyPolicy}
        onDetailClick={openTermsModal}
      />
      <CustomCheckbox
        id="marketing-consent"
        label="마케팅 정보 수신 동의 (선택)"
        checked={agreedToMarketing}
        onChange={props.onChangeAgreedToMarketing}
      />
    </div>
  );
};
