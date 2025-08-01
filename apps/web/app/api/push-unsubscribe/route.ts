import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

export async function POST(request: NextRequest) {
  const supabase = createApiClient(request);

  const body = await request.json();
  const { user_agent } = body;

  // 현재 로그인된 유저 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error: updateError } = await supabase
    .from('push_subscriptions')
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('user_agent', user_agent); // user_agent로 기기 구분

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  console.log('✅ 구독 해제 완료:', {
    userId: user.id,
    userAgent: user_agent?.slice(0, 30) + '...',
  });

  return NextResponse.json({ success: true });
}
