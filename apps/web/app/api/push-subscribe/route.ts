import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '@/app/server';

// 디바이스 식별을 위한 간단한 해시 생성
function generateDeviceId(userAgent: string, endpoint: string): string {
  // UserAgent + endpoint의 일부로 디바이스 구분
  const deviceInfo = userAgent + endpoint.slice(-20);
  return Buffer.from(deviceInfo).toString('base64').slice(0, 16);
}

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

  // 디바이스 ID 생성
  const deviceId = generateDeviceId(user_agent, endpoint);

  // user_id + device_id 조합으로 UPSERT
  const { error: upsertError } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: user.id,
      device_id: deviceId,
      endpoint,
      p256dh,
      auth,
      user_agent,
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,device_id' }
  );

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
