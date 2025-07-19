import { createApiClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createApiClient(request);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = userData.user.id;

  // 모든 안 읽은 메시지 가져오기
  const { data, error } = await supabase
    .from('message')
    .select('room_id') // count 없이 전체 불러옴
    .eq('is_read', false)
    .neq('sender_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // room_id별로 갯수 세기
  const countMap: Record<string, number> = {};
  for (const msg of data) {
    const roomId = msg.room_id;
    countMap[roomId] = (countMap[roomId] ?? 0) + 1;
  }

  return NextResponse.json(countMap);
}
