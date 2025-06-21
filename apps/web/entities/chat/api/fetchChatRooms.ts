import { supabase } from '../../../lib/supabase/supabase';
import { ChatRoom } from '../types';

export const fetchChatRooms = async (userId: string): Promise<ChatRoom[]> => {
  const { data, error } = await supabase
    .from('chatroom')
    .select('*')
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data as ChatRoom[];
};
