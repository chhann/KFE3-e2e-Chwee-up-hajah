'use client';

import { SignupFormComponent } from '@/widgets/authentication/SignupFormComponent';

import { useSignup } from '@/shared/hooks/useSignup';

const SignupPage = () => {
  const signupProps = useSignup();

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden py-4">
      <SignupFormComponent {...signupProps} />
    </main>
  );
};

export default SignupPage;
