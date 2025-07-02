'use client';

import { useSignup } from '../../../hooks/useSignup';
import { SignupFormComponent } from '../../../widgets/authentication/SignupFormComponent';

const SignupPage = () => {
  const signupProps = useSignup();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SignupFormComponent {...signupProps} />
    </main>
  );
};

export default SignupPage;
