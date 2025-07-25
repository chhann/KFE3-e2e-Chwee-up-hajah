import { adminClient } from '@/app/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { hotdealId, userId, purchasePrice } = await req.json();

  if (!hotdealId || typeof purchasePrice !== 'number') {
    return NextResponse.json({ error: 'Missing hotdealId or purchasePrice' }, { status: 400 });
  }

  const { data, error } = await adminClient.rpc('handle_hot_deal_purchase', {
    p_hot_deal_id: hotdealId,
    p_user_id: userId,
    p_purchase_price: purchasePrice,
  });

  if (error) {
    console.error('구매 중 에러 발생:', error);
    // RLS 에러 메시지를 좀 더 친절하게 변경
    return NextResponse.json(
      { error: error.message || 'An internal error occurred.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Purchase successful', data }, { status: 200 });
}
