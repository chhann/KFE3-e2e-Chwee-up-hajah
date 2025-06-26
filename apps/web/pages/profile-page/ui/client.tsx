'use client';

import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../../../features/profile/api/getProfile';
import { supabase } from '../../../lib/supabase/supabase';
import { UserProfileType } from '../../../widgets/profile';

import { ProfilePage } from './index';

export const ProfilePageClient = ({ initialUser }: { initialUser: UserProfileType }) => {
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw new Error(`인증 오류: ${authError.message}`);
      if (!user) throw new Error('인증되지 않은 사용자입니다.');

      try {
        const profileData = await getProfile(user.id);
        return profileData;
      } catch (profileError) {
        throw new Error(`프로필 조회 실패: ${(profileError as Error).message}`);
      }
    },
    initialData: initialUser,
  });

  if (isLoading) return <div>프로필을 불러오는 중...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  if (!userData) return <div>프로필 정보를 찾을 수 없습니다.</div>;

  return <ProfilePage user={userData!} />;
};
