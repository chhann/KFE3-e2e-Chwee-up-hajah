import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const { data, error } = await adminClient
      .from('user')
      .select('user_id, username, email, address, address_detail, avatar, points, tier')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in profile fetch API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
