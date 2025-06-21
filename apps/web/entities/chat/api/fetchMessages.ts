// entities/chat/api/fetchMessages.ts
import { supabase } from '../../../lib/supabase/supabase';
import { Message } from '../types';

export const fetchMessages = async (roomId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('room_id', roomId)
    .order('sent_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data as Message[];
};
