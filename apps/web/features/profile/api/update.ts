import { supabase } from '@/lib/supabase/supabase';

export const updateProfile = async ({
  id,
  username,
  address,
  addressDetail,
  avatarUrl,
}: {
  id: string;
  username?: string;
  address?: string;
  addressDetail?: string;
  avatarUrl?: string;
}) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      username,
      address,
      address_detail: addressDetail,
      avatar: avatarUrl,
    })
    .eq('user_id', id)
    .select();

  if (error) throw error;
  return data;
};
