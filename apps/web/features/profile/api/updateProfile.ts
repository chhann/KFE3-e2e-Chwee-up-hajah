import { UserProfileType } from '@/widgets/profile';

interface UpdateProfileParams {
  id: string;
  username?: string;
  address?: string;
  addressDetail?: string;
  avatarUrl?: string;
}

export const updateProfile = async (params: UpdateProfileParams): Promise<UserProfileType> => {
  const response = await fetch('/api/profile/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return response.json();
};
