import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { updateProfile } from '@/features/profile/api/updateProfile';

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
    mutationFn: (params: UpdateProfileParams) => updateProfile(params),
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
