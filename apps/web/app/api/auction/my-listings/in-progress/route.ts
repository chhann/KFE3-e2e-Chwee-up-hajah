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
      .from('auction')
      .select(
        `
        *,
        product:product_id (name, category, description),
        seller:seller_id (username, address)
        `
      )
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('In-progress listings fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = (data || []).filter((item) => item.status !== 'closed');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Unexpected error in my in-progress listings API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
