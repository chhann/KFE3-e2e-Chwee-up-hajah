import { UserProfileType } from '@/shared/types/profile';

interface UpdateProfileParams {
  id: string;
  username?: string;
  address?: string;
  addressDetail?: string;
  avatarUrl?: string;
}

export const postProfile = async (params: UpdateProfileParams): Promise<UserProfileType> => {
  try {
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('[updateProfile] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while updating profile');
  }
};
