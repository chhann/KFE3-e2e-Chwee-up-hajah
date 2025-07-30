import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { postProfile } from '@/shared/api/server/profile/postProfile';

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
      toast.success('프로필 정보가 성공적으로 업데이트되었습니다.');
      router.refresh();
      router.push('/profile');
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
      toast.error('프로필 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
