'use client';

import type { UseSignupReturn } from '../../../features/authentication/model/types';
import { AddressInputSection } from './AddressInputSection';
import { EmailInputSection } from './EmailInputSection';
import { LoginLink } from './LoginLink';
import { PasswordInputSection } from './PasswordInputSection';
import { SubmitButton } from './SubmitButton';
import { UsernameInputSection } from './UsernameInputSection';
import { SignupFormComponentStyles } from './styles';

export const SignupFormComponent = (props: UseSignupReturn) => {
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
          onAddressSearch={props.onAddressSearch}
          error={props.fieldErrors.address}
        />
        {props.formError && (
          <p className={SignupFormComponentStyles.formError}>{props.formError}</p>
        )}
        <SubmitButton
          isSubmitting={props.isSubmitting}
          email={props.email}
          username={props.username}
          password={props.password}
          confirmPassword={props.confirmPassword}
          emailError={props.fieldErrors.email}
        />
        <LoginLink />
      </form>
    </div>
  );
};
