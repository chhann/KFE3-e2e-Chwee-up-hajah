import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

export async function POST(request: NextRequest) {
  const supabase = createApiClient(request);

  const body = await request.json();
  const {
    endpoint,
    keys: { p256dh, auth },
    user_agent,
  } = body;

  // 현재 로그인된 유저 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error: upsertError } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: user.id,
      user_agent, // 이것만으로 기기 구분
      endpoint,
      p256dh,
      auth,
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,user_agent' } // user_id + user_agent 조합
  );

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
