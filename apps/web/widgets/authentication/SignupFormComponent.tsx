'use client';

import { MarketingContent } from '@/shared/lib/terms/MarketingContent';
import { PrivacyPolicyContent } from '@/shared/lib/terms/PrivacyPolicyContent';
import { TermsOfServiceContent } from '@/shared/lib/terms/TermsOfServiceContent';

import type { UseSignupReturn } from '@/shared/types/auth/types';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { CustomCheckbox } from '@repo/ui/design-system/base-components/CustomCheckbox/index';
import { useState } from 'react';
import { AddressInputSection } from './AddressInputSection';
import { BaseModal } from './BaseModal';
import { EmailInputSection } from './EmailInputSection';
import { LoginLink } from './LoginLink';
import { PasswordInputSection } from './PasswordInputSection';
import { SignupFormComponentStyles } from './styles';
import { SubmitButton } from './SubmitButton';
import { TermsAgreementCheckboxes } from './TermsAgreementCheckboxes';
import { UsernameInputSection } from './UsernameInputSection';

export const SignupFormComponent = (props: UseSignupReturn) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [currentTermType, setCurrentTermType] = useState<
    'termsOfService' | 'privacyPolicy' | 'marketing' | null
  >(null); // 새로운 상태 추가

  const [modalAgreed, setModalAgreed] = useState(false);

  const openTermsModal = (type: 'termsOfService' | 'privacyPolicy' | 'marketing') => {
    setCurrentTermType(type); // 어떤 약관을 열지 설정
    // 모달 열 때 현재 약관 동의 상태를 모달 내부 상태로 초기화
    switch (type) {
      case 'termsOfService':
        setModalAgreed(props.agreedToTermsOfService);
        break;
      case 'privacyPolicy':
        setModalAgreed(props.agreedToPrivacyPolicy);
        break;
      case 'marketing':
        setModalAgreed(props.agreedToMarketing);
        break;
      default:
        setModalAgreed(false);
        break;
    }
    setIsTermsModalOpen(true);
  };

  const handleModalConfirm = () => {
    const syntheticEvent = {
      target: { checked: modalAgreed },
    } as React.ChangeEvent<HTMLInputElement>;

    switch (currentTermType) {
      case 'termsOfService':
        props.onChangeAgreedToTermsOfService(syntheticEvent);
        break;
      case 'privacyPolicy':
        props.onChangeAgreedToPrivacyPolicy(syntheticEvent);
        break;
      case 'marketing':
        props.onChangeAgreedToMarketing(syntheticEvent);
        break;
      default:
        break;
    }
    setIsTermsModalOpen(false);
    setCurrentTermType(null); // 모달 닫을 때 타입 초기화
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
    setCurrentTermType(null); // 모달 닫을 때 타입 초기화
  };

  const getModalContent = () => {
    switch (currentTermType) {
      case 'termsOfService':
        return <TermsOfServiceContent />;
      case 'privacyPolicy':
        return <PrivacyPolicyContent />;
      case 'marketing':
        return <MarketingContent />;
      default:
        return null;
    }
  };

  const getModalTitle = (): string => {
    switch (currentTermType) {
      case 'termsOfService':
        return '서비스 이용 약관';
      case 'privacyPolicy':
        return '개인정보 수집 및 이용 동의';
      case 'marketing':
        return '마케팅 정보 수신 및 활용 동의';
      default:
        return '';
    }
  };

  return (
    <div className={SignupFormComponentStyles.container}>
      <h2 className={SignupFormComponentStyles.title}>회원가입</h2>
      <form onSubmit={props.onSubmit} className={SignupFormComponentStyles.form}>
        <EmailInputSection
          email={props.email}
          onChangeEmail={props.onChangeEmail}
          onEmailDuplicateCheck={props.onEmailDuplicateCheck}
          isCheckingEmail={props.isCheckingEmail}
          emailCheckStatus={props.emailCheckStatus}
          error={props.fieldErrors.email}
        />
        <PasswordInputSection
          password={props.password}
          confirmPassword={props.confirmPassword}
          onChangePassword={props.onChangePassword}
          onChangePasswordConfirm={props.onChangePasswordConfirm}
          passwordError={props.fieldErrors.password}
          confirmPasswordError={props.fieldErrors.confirmPassword}
        />
        <UsernameInputSection
          username={props.username}
          onChangeUsername={props.onChangeUsername}
          onUsernameDuplicateCheck={props.onUsernameDuplicateCheck}
          isCheckingUsername={props.isCheckingUsername}
          usernameCheckStatus={props.usernameCheckStatus}
          error={props.fieldErrors.username}
        />
        <AddressInputSection
          address={props.address}
          addressDetail={props.addressDetail}
          onChangeAddress={props.onChangeAddress}
          onChangeAddressDetail={props.onChangeAddressDetail}
          error={props.fieldErrors.address}
        />

        {/* 약관 동의 섹션 */}
        <TermsAgreementCheckboxes
          agreedToTermsOfService={props.agreedToTermsOfService}
          onChangeAgreedToTermsOfService={props.onChangeAgreedToTermsOfService}
          agreedToPrivacyPolicy={props.agreedToPrivacyPolicy}
          onChangeAgreedToPrivacyPolicy={props.onChangeAgreedToPrivacyPolicy}
          agreedToMarketing={props.agreedToMarketing}
          onChangeAgreedToMarketing={props.onChangeAgreedToMarketing}
          openTermsModal={openTermsModal}
        />

        <SubmitButton
          isSubmitting={props.isSubmitting}
          email={props.email}
          username={props.username}
          password={props.password}
          confirmPassword={props.confirmPassword}
          emailError={props.fieldErrors.email}
          agreedToTerms={props.agreedToTermsOfService && props.agreedToPrivacyPolicy}
        />
        <LoginLink />
      </form>
      {isTermsModalOpen && (
        <BaseModal
          title={getModalTitle()}
          onClose={closeTermsModal}
          customFooter={
            <div className="flex w-full flex-col items-center justify-end">
              <CustomCheckbox
                id="modal-agree-checkbox"
                label="위 약관에 동의합니다."
                checked={modalAgreed}
                onChange={(e) => setModalAgreed(e.target.checked)}
              />
              <p className="mt-2"></p>
              <Button
                onClick={handleModalConfirm}
                variants="primary"
                className="mb-2 mt-2 w-full text-lg"
              >
                확인
              </Button>
            </div>
          }
        >
          {getModalContent()}
        </BaseModal>
      )}
    </div>
  );
};
