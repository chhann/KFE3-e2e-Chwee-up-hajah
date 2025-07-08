import { useMutation, useQueryClient } from '@tanstack/react-query';

const logout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.');
  }
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      // 로그아웃 성공 시, 사용자 정보를 다시 불러오기 위해 관련 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
