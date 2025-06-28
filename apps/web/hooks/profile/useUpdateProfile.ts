import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { updateProfile } from '../../features/profile/api/update';

export const useUpdateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert('프로필 정보가 수정되었습니다.');
      router.refresh();
      router.push('/profile');
    },
    onError: () => {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
