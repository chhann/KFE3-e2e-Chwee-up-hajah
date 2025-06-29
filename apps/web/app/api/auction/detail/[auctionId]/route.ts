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
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: typeof error === 'string' ? error : JSON.stringify(error) },
      { status: 500 }
    );
  }
}
