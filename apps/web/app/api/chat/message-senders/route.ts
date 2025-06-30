// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { createApiClient } from '../../../server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userIds: string[] = body.userIds;

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return NextResponse.json({ error: 'userIds가 필요합니다' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase.from('user').select('*').in('user_id', userIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
