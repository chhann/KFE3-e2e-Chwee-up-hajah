import { LoginRequest } from '@/shared/types/auth/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const login = async (credentials: LoginRequest): Promise<void> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.error && errorData.error.message) {
      const errorMessage = errorData.error.message;
      if (errorMessage.includes('Invalid login credentials')) {
        throw new Error('이메일 또는 비밀번호를 확인해주세요.');
      } else if (errorMessage.includes('is invalid')) {
        throw new Error('해당 이메일은 존재하지 않는 이메일입니다.');
      } else {
        throw new Error(errorMessage);
      }
    }
    throw new Error(errorData.message || '로그인에 실패했습니다.');
  }
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: () => {
      // 로그인 성공 시, 사용자 정보를 다시 불러오기 위해 관련 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
