import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

export async function PATCH(req: NextRequest) {
  const { messageIds } = await req.json();

  if (!Array.isArray(messageIds) || messageIds.length === 0) {
    return NextResponse.json({ error: 'messageIds가 필요합니다' }, { status: 400 });
  }

  const supabase = createApiClient(req); // 인증 안 쓸 거면 req만 OK

  const { error } = await supabase
    .from('message')
    .update({ is_read: true })
    .in('message_id', messageIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
