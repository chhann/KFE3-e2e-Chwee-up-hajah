import { UserProfileType } from '@/shared/types/profile';

import { adminClient } from '@/app/admin';
import { createSSRClient } from '@/app/server';

export const getProfile = async (): Promise<UserProfileType> => {
  try {
    const supabase = await createSSRClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: profileData, error } = await adminClient
      .from('user')
      .select('user_id, username, email, address, address_detail, avatar, points, grade')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      throw new Error(error.message);
    }

    return profileData;
  } catch (error: unknown) {
    console.error('[getProfile] Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while fetching profile');
  }
};
