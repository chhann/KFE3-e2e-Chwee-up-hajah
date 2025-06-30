import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '../../../server';

export async function POST(req: NextRequest) {
  const supabase = createApiClient(req);
  const { roomId, senderId, content } = await req.json();

  if (!roomId || !senderId || !content) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  const now = new Date().toISOString();

  const { error } = await supabase.from('message').insert({
    room_id: roomId,
    sender_id: senderId,
    content,
    sent_at: now,
    is_read: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
