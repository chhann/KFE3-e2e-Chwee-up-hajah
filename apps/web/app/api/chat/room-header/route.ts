import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase
    .from('view_chatroom_header')
    .select('*')
    .eq('room_id', roomId)
    .single();

  if (error) {
    console.error('[GET /api/chat/list]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
