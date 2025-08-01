import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase
    .from('view_chatlist_with_thumbnail')
    .select('*')
    .eq('user_id', userId) // user_id 기준 필터
    .order('last_sent_at', { ascending: false });

  if (error) {
    console.error('[GET /api/chat/list]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
