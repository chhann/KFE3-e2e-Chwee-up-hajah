import { adminClient } from '@/app/admin';
import { sendNotificationAsync } from '@/shared/lib/notification/sendNotification';
import { NextRequest, NextResponse } from 'next/server';

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

  // 이전 최고 입찰자 조회 (첫 입찰이 아닌 경우에만 )
  let previousBidderId = null;
  if (auction.current_price > 0) {
    const { data: previousBid } = await adminClient
      .from('bid')
      .select('bidder_id, bid_price')
      .eq('auction_id', auctionId)
      .neq('bidder_id', bidderId) // 현재 입찰자 제외
      .order('bid_price', { ascending: false })
      .order('bid_time', { ascending: false }) // 같은 가격이면 최신순
      .limit(1)
      .single();

    // 중요: 이전 입찰자의 가격이 현재 경매의 최고가와 같을 때만 (= 진짜 직전 최고 입찰자)
    if (previousBid && previousBid.bid_price === auction.current_price) {
      previousBidderId = previousBid.bidder_id;
    }
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

  if (previousBidderId) {
    sendNotificationAsync({
      userId: previousBidderId,
      auctionId,
      title: '더 높은 입찰 등장!',
      body: `경매에서 더 높은 입찰이 나타났습니다. 현재 최고가: ${bidPrice.toLocaleString()}원`,
      type: 'auction_outbid',
      data: {
        bid_amount: bidPrice,
      },
    });
  }

  return NextResponse.json({ success: true });
}
