import { adminClient } from '@/app/admin';
import { getAuctionStatus } from '@/shared/lib/utils/auctionStatus';
import { NextResponse } from 'next/server';

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
    const result = (data || []).map((item: any) => {
      const { status: oldStatus, ...rest } = item;
      return { ...rest, status: getAuctionStatus(item) };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
