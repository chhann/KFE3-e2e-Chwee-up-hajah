import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/features/authentication/api/authService';
import type { SignupData } from '@/features/authentication/model/types';

export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (signupData: SignupData) => AuthService.signup(signupData),
    onSuccess: (result) => {
      if (result.needsVerification) {
        alert('가입 확인 이메일을 발송했습니다. 이메일을 확인 후 로그인해주세요.');
        router.push('/login');
      } else {
        router.push('/main');
      }
    },
    onError: (error: Error) => {
      // 에러 처리 로직은 useSignup 훅에서 처리하도록 error를 throw합니다.
      throw error;
    },
  });
};
