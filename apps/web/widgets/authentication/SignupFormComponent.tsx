'use client';

import type { UseSignupReturn } from '@/shared/types/auth/types';
import { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { AddressInputSection } from './AddressInputSection';
import { EmailInputSection } from './EmailInputSection';
import { LoginLink } from './LoginLink';
import { PasswordInputSection } from './PasswordInputSection';
import { SubmitButton } from './SubmitButton';
import { TermsModal } from './TermsModal';
import { UsernameInputSection } from './UsernameInputSection';
import { SignupFormComponentStyles } from './styles';

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
        {props.formError && (
          <p className={SignupFormComponentStyles.formError}>{props.formError}</p>
        )}
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={props.agreedToTerms}
                onChange={props.onChangeAgreedToTerms}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="terms" className="ml-3 block text-sm font-medium text-gray-700">
                이용약관 및 개인정보 처리방침 동의
              </label>
            </div>
            <button
              type="button"
              onClick={openTermsModal}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoChevronForward className="h-6 w-6" />
            </button>
          </div>
        </div>
        <SubmitButton
          isSubmitting={props.isSubmitting}
          email={props.email}
          username={props.username}
          password={props.password}
          confirmPassword={props.confirmPassword}
          emailError={props.fieldErrors.email}
          agreedToTerms={props.agreedToTerms}
        />
        <LoginLink />
      </form>
      {isTermsModalOpen && <TermsModal onClose={closeTermsModal} />}
    </div>
  );
};
