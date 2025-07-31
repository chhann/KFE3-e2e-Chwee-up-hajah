import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

function generateDeviceId(userAgent: string, endpoint: string): string {
  const deviceInfo = userAgent + endpoint.slice(-20);
  return Buffer.from(deviceInfo).toString('base64').slice(0, 16);
}

export async function POST(request: NextRequest) {
  const supabase = createApiClient(request);

  const body = await request.json();
  const { endpoint, user_agent } = body;

  // 현재 로그인된 유저 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 현재 기기의 device_id 생성
  const deviceId = generateDeviceId(user_agent, endpoint);

  // 해당 유저의 해당 기기만 구독 해제
  const { error: updateError } = await supabase
    .from('push_subscriptions')
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('device_id', deviceId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
