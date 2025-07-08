import { useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';

const fetchUser = async (): Promise<User | null> => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) {
    // 2xx 상태 코드가 아닌 경우, null을 반환하여 '로그인되지 않음' 상태로 처리
    if (response.status === 401) {
      return null;
    }
    throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
  }
  const data = await response.json();
  return data.user;
};

export const useUserQuery = () => {
  return useQuery<User | null, Error>({
    queryKey: ['user', 'me'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 재요청
  });
};
