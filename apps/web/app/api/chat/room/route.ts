// app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '../../../server';

export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase
    .from('view_message_with_sender')
    .select('*')
    .eq('room_id', roomId)
    .order('sent_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
