'use client';

import { useLogin } from '../../../shared/hooks/useLogin';
import { LoginFormComponent } from '../../../widgets/authentication/LoginFormComponent';
import { SignUpLinkComponent } from '../../../widgets/authentication/SignUpLinkComponent';
import { SocialLoginSection } from '../../../widgets/authentication/SocialLoginSection';

const LoginPage = () => {
  const { email, password, error, onChangeEmail, onChangePassword, onSubmit, resetFields } =
    useLogin();

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mt mb-4 text-center text-2xl font-bold">로그인</h2>
      <LoginFormComponent
        email={email}
        password={password}
        error={error}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
      />
      <SocialLoginSection onSocialLoginClick={resetFields} />
      <SignUpLinkComponent />
    </div>
  );
};

export default LoginPage;
