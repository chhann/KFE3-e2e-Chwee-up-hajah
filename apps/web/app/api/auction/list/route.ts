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

    // status 계산 및 덮어쓰기
    const now = new Date();
    const result = (data || []).map((item: any) => {
      let status: 'ready' | 'in progress' | 'end' = 'ready';
      const start = item.start_time ? new Date(item.start_time) : null;
      const end = item.end_time ? new Date(item.end_time) : null;
      if (start && end) {
        if (now < start) status = 'ready';
        else if (now >= start && now <= end) status = 'in progress';
        else if (now > end) status = 'end';
      }
      const { status: oldStatus, ...rest } = item;
      return { ...rest, status };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
