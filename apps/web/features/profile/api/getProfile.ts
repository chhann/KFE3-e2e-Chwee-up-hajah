// 이 함수는 서버 컴포넌트(pages.tsx)에서 직접 호출되어 사용자의 프로필을 가져옵니다.
// 따라서 NEXT_PUBLIC_BASE_URL 환경 변수를 사용해 절대 경로로 API Route를 호출합니다.

import { UserProfileType } from '@/types/profile';

export const getProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await fetch(
    // 서버에서 호출되므로 반드시 절대 경로 사용
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/get?userId=${userId}`,
    {
      cache: 'no-store', // 또는 필요한 캐싱 전략
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch profile');
  }

  return response.json();
};
