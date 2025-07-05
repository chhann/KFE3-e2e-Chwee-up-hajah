import type { LoginRequest } from '@/features/authentication/model/types';
import { useAuthStore } from '@/stores/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

async function login(credentials: LoginRequest) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || '로그인에 실패했습니다.');
  }

  return data;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.userId);
      queryClient.invalidateQueries({ queryKey: ['user'] }); // 쿼리 유효성 검사
      router.push('/main');
    },
  });
};
