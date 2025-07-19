import { adminClient } from '@/app/admin';
import { createSSRClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 현재 로그인한 사용자 정보
    const supabase = await createSSRClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // 현재 로그인한 유저의 notification 알림 가져오기
    const { data, error: dbError } = await adminClient
      .from('notification')
      .select(`*`)
      .eq('user_id', user.id)
      .order('sent_at', { ascending: false });

    if (dbError) {
      console.error('database', dbError);
      return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
