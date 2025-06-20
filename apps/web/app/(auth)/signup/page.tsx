'use client';

import { useSignup } from '../../../features/authentication/model/useSignup';
import SignupForm from '../../../features/authentication/ui/SignupForm';

const SignupPage = () => {
  const signupProps = useSignup();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SignupForm {...signupProps} />
    </main>
  );
};

export default SignupPage;
