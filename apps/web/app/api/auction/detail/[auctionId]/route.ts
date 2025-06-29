import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '../../../../admin';

// /api/auction/detail/[auctionId]
export async function GET(req: NextRequest, { params }: { params: { auctionId: string } }) {
  const { auctionId } = params;
  if (!auctionId) {
    return NextResponse.json({ error: 'auctionId is required' }, { status: 400 });
  }
  try {
    const { data, error } = await adminClient
      .from('auction')
      .select(
        `
        *,
        product:product_id (*),
        seller:seller_id (username, address),
        bids:auction_id (*, user:bidder_id (username))
      `
      )
      .eq('auction_id', auctionId)
      .single();
    if (error) throw error;

    // status 계산 (기존 status 필드가 있어도 서버 계산값으로 덮어씀)
    let status: 'ready' | 'in progress' | 'end' = 'ready';
    const now = new Date();
    const start = data.start_time ? new Date(data.start_time) : null;
    const end = data.end_time ? new Date(data.end_time) : null;
    if (start && end) {
      if (now < start) status = 'ready';
      else if (now >= start && now <= end) status = 'in progress';
      else if (now > end) status = 'end';
    }
    const { status: oldStatus, ...rest } = data;
    return NextResponse.json({ data: { ...rest, status } });
  } catch (error) {
    return NextResponse.json(
      { error: typeof error === 'string' ? error : JSON.stringify(error) },
      { status: 500 }
    );
  }
}
