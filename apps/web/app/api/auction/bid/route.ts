import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '../../../admin';

export async function POST(req: NextRequest) {
  const { auctionId, bidderId, bidPrice } = await req.json();
  if (!auctionId || !bidderId || !bidPrice) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  // 트랜잭션 시작
  const { data: auction, error: auctionError } = await adminClient
    .from('auction')
    .select('current_price, bid_count')
    .eq('auction_id', auctionId)
    .single();

  if (auctionError || !auction) {
    return NextResponse.json({ error: '경매 정보를 찾을 수 없습니다.' }, { status: 404 });
  }
  if (bidPrice <= auction.current_price) {
    return NextResponse.json({ error: '입찰가는 현재 입찰가보다 커야 합니다.' }, { status: 400 });
  }

  // 1. auction 테이블 업데이트
  const { error: updateError } = await adminClient
    .from('auction')
    .update({
      current_price: bidPrice,
      bid_count: auction.bid_count + 1,
    })
    .eq('auction_id', auctionId); // bidderId -> auctionId로 수정

  if (updateError) {
    return NextResponse.json({ error: '경매 정보 업데이트 실패' }, { status: 500 });
  }

  // 2. bid 테이블에 insert (snake_case 컬럼명 사용)
  const { error: bidError } = await adminClient.from('bid').insert({
    auction_id: auctionId,
    bidder_id: bidderId,
    bid_price: bidPrice,
    bid_time: new Date().toISOString(),
  });

  if (bidError) {
    return NextResponse.json({ error: '입찰 기록 저장 실패' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
