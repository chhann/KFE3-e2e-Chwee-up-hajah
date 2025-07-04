import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    seller_id,
    name,
    category,
    description,
    start_price,
    start_time,
    end_time,
    thumbnail,
    images,
  } = body;

  try {
    const { data: productData, error: productError } = await adminClient
      .from('product')
      .insert([{ name, category, description }])
      .select()
      .single();

    if (productError) throw productError;

    const { error: auctionError } = await adminClient.from('auction').insert([
      {
        product_id: productData.product_id,
        seller_id,
        start_price,
        current_price: start_price,
        start_time,
        end_time,
        thumbnail,
        images,
        status: 'ready',
        seller_confirm: false,
        buyer_confirm: false,
        bid_count: 0,
      },
    ]);

    if (auctionError) {
      // auction insert 실패 시 product 롤백
      await adminClient.from('product').delete().eq('product_id', productData.product_id);
      throw auctionError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[경매 등록 에러]', error);
    return NextResponse.json({ error: String(error), detail: error }, { status: 500 });
  }
}
