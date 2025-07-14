import { postProfile } from '@/shared/api/server/profile/postProfile';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UpdateProfileParams {
  id: string;
  username?: string;
  address?: string;
  addressDetail?: string;
  avatarUrl?: string;
}

export const useUpdateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (params: UpdateProfileParams) => postProfile(params),
    onSuccess: () => {
      alert('프로필 정보가 성공적으로 업데이트되었습니다.');
      router.refresh();
      router.push('/profile');
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
      alert(`프로필 업데이트 실패: ${error.message}`);
    },
  });
};
