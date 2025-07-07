import { useAuthStore } from '@/shared/stores/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '로그아웃 실패');
      }

      return res.json();
    },
    onSuccess: () => {
      const state = useAuthStore.getState();
      state.logout();
      router.replace('/main');
    },
    onError: (error) => {
      alert(error.message || '오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
