'use client';

import type { UseSignupReturn } from '@/shared/types/auth/types';
import { useState } from 'react';
import { AddressInputSection } from './AddressInputSection';
import { EmailInputSection } from './EmailInputSection';
import { LoginLink } from './LoginLink';
import { PasswordInputSection } from './PasswordInputSection';
import { SignupFormComponentStyles } from './styles';
import { SubmitButton } from './SubmitButton';
import { TermsModal } from './TermsModal';
import { TermsSection } from './TermsSection';
import { UsernameInputSection } from './UsernameInputSection';

export const SignupFormComponent = (props: UseSignupReturn) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);
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
        <TermsSection
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
          agreedToTerms={props.agreedToTermsOfService}
        />
        <LoginLink />
      </form>
      {isTermsModalOpen && <TermsModal onClose={closeTermsModal} />}
    </div>
  );
};
