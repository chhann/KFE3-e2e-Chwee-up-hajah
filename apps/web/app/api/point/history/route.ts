import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';
import { createSSRClient } from '@/app/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createSSRClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const filter = url.searchParams.get('filter') || 'all';

    let query = adminClient.from('points_history').select('*').eq('user_id', user.id);

    // 필터 적용
    switch (filter) {
      case 'earned':
        query = query.gt('points_earned', 0);
        break;
      case 'deducted':
        query = query.lt('points_earned', 0);
        break;
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('points history fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in points history fetch API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
