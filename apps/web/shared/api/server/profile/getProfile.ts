// 이 함수는 서버 컴포넌트(pages.tsx)에서 직접 호출되어 사용자의 프로필을 가져옵니다.
// 따라서 NEXT_PUBLIC_BASE_URL 환경 변수를 사용해 절대 경로로 API Route를 호출합니다.

import { UserProfileType } from '@/shared/types/profile';

export const getProfile = async (userId: string): Promise<UserProfileType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/get?userId=${userId}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('[getProfile] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while fetching profile');
  }
};
