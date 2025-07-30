import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

import { sendNotificationAsync } from '@/shared/lib/notification/sendNotification';

export async function POST(req: NextRequest) {
  const { auctionId, bidderId, bidPrice } = await req.json();
  if (!auctionId || !bidderId || !bidPrice) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  // 기존 알림 로직: 입찰 전, 이전 최고 입찰자 조회
  let previousBidderId: string | null = null;
  const { data: prevBid } = await adminClient
    .from('bid')
    .select('bidder_id, bid_price')
    .eq('auction_id', auctionId)
    .neq('bidder_id', bidderId) // 현재 입찰자 제외
    .order('bid_price', { ascending: false })
    .order('bid_time', { ascending: false })
    .limit(1)
    .single();

  if (prevBid) {
    previousBidderId = prevBid.bidder_id;
  }

  // place_bid 함수 호출 (모든 검증 및 입찰 처리)
  const { error } = await adminClient.rpc('place_bid', {
    p_auction_id: auctionId,
    p_bidder_id: bidderId,
    p_bid_price: bidPrice,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 기존 알림 로직 유지: 이전 최고 입찰자에게 알림 전송
  if (previousBidderId) {
    sendNotificationAsync({
      userId: previousBidderId,
      auctionId,
      title: '입찰에 실패하였습니다.',
      body: `경매에서 더 높은 입찰이 나타났습니다. 현재 최고가: ${bidPrice.toLocaleString()}원`,
      type: 'auction_outbid',
      data: {
        bid_amount: bidPrice,
      },
    });
  }

  return NextResponse.json({ success: true });
}
