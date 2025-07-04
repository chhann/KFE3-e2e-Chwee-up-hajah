import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/features/authentication/api/authService';

export const useCheckDuplicateMutation = () => {
  return useMutation({
    mutationFn: ({ type, value }: { type: 'email' | 'username'; value: string }) =>
      AuthService.checkDuplicate(type, value),
    onError: (error: Error) => {
      // 에러 처리 로직은 useSignup 훅에서 처리하도록 error를 throw합니다.
      throw error;
    },
  });
};
