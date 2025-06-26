import { supabase } from '../../../lib/supabase/supabase';

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user')
    .select('user_id, username, email, address, address_detail')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};
