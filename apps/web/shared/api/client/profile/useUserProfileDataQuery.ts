'use client';

import { useQuery } from '@tanstack/react-query';
import { UserProfileType } from '@/shared/types/profile';

const fetchUserProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await fetch(`/api/profile/get?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const useUserProfileDataQuery = (userId: string) => {
  return useQuery<UserProfileType, Error>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리를 실행합니다.
  });
};
