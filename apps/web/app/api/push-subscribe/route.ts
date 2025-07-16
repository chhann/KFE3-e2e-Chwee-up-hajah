import { createApiClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

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

  // UPSERT (endpoint 기준)
  const { error: upsertError } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: user.id,
      endpoint,
      p256dh,
      auth,
      user_agent,
      is_active: true,
    },
    { onConflict: 'endpoint' }
  );

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
