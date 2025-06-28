import { supabase } from '@/lib/supabase/supabase';

export const sendMessage = async ({
  roomId,
  senderId,
  content,
}: {
  roomId: string;
  senderId: string;
  content: string;
}) => {
  const now = new Date().toISOString();

  const { error } = await supabase.from('message').insert({
    room_id: roomId,
    sender_id: senderId,
    content,
    sent_at: now,
    is_read: false,
  });

  if (error) {
    throw new Error(error.message);
  }
};
