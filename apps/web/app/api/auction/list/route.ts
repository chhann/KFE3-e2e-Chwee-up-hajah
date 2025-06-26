import { NextResponse } from 'next/server';

import { adminClient } from '../../../admin';

export async function GET() {
  try {
    const { data, error } = await adminClient
      .from('auction')
      .select(
        `
    *,
    product:product_id (
      name,
      category,
      description
    ),
    seller:seller_id (
      username,
      address
    )
  `
      )
      .order('end_time', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
