'use client';

import { useSignup } from '@/shared/hooks/useSignup';
import { SignupFormComponent } from '@/widgets/authentication/SignupFormComponent';

const SignupPage = () => {
  const signupProps = useSignup();

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden p-4">
      <SignupFormComponent {...signupProps} />
    </main>
  );
};

export default SignupPage;
