import { adminClient } from '@/app/admin';
import { sendNotificationAsync } from '@/shared/lib/notification/sendNotification';
import { NextRequest, NextResponse } from 'next/server';

// UTC 시간 파싱 함수
const parseUTCDate = (dateString?: string): Date | null => {
  if (!dateString) return null;
  // 'Z'를 붙여 UTC로 해석하도록 함
  const isoString = dateString.includes('T')
    ? dateString + 'Z'
    : dateString.replace(' ', 'T') + 'Z';
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
};

export async function GET(req: NextRequest) {
  try {
    // 1. 종료된 경매 조회 (status가 closed인 것 중에서)
    const { data: expiredAuctions, error } = await adminClient
      .from('auction')
      .select('*, product(*)')
      .lt('end_time', new Date().toISOString())
      .eq('status', 'closed'); // 이미 closed된 것 중에서

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. 각 경매가 실제로 종료되었는지 UTC 시간으로 다시 한 번 확인
    const actuallyExpiredAuctions = expiredAuctions.filter((auction) => {
      const endTime = parseUTCDate(auction.end_time);
      const now = new Date();

      // 오늘 종료된 경매만 처리 (중복 방지)
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

      return endTime && now > endTime && endTime >= todayStart && endTime < todayEnd;
    });

    // 3. 각 경매 처리
    for (const auction of actuallyExpiredAuctions) {
      await processExpiredAuction(auction);
    }

    console.log('알림 발송 처리된 경매 ', actuallyExpiredAuctions);
    return NextResponse.json({
      success: true,
      processed: actuallyExpiredAuctions.length,
    });
  } catch (error) {
    console.error('크론잡 에러:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processExpiredAuction(auction: any) {
  try {
    // 0. 이미 이 경매에 대한 알림을 보냈는지 확인
    // auction_outbid는 경매 진행 중 입찰 알림이므로 제외
    const { data: existingNotification } = await adminClient
      .from('notification')
      .select('notification_id')
      .eq('auction_id', auction.auction_id)
      .neq('type', 'auction_outbid')
      .limit(1)
      .single();

    if (existingNotification) {
      console.log(`경매 ${auction.auction_id}는 이미 알림을 보냈습니다.`);
      return;
    }

    // 1. 낙찰자 확인 (가장 높은 입찰가)
    const { data: winner } = await adminClient
      .from('bid')
      .select('*')
      .eq('auction_id', auction.auction_id)
      .order('bid_price', { ascending: false }) // 가장 높은 입찰가 순
      .order('bid_time', { ascending: false }) // 같은 가격이면 나중에 입찰한 순
      .limit(1)
      .single();

    if (winner) {
      // 2. 낙찰자에게 알림
      await sendNotificationAsync({
        userId: winner.bidder_id,
        auctionId: auction.auction_id,
        title: '낙찰 축하드립니다!',
        body: `"${auction.product.name}" 경매에서 낙찰되었습니다! 낙찰가: ${winner.bid_price.toLocaleString()}원`,
        type: 'auction_won',
        data: {
          winning_bid: winner.bid_price,
          product_name: auction.product.name,
        },
      });

      // 3. 낙찰 못한 유저들에게 알림
      const { data: losers } = await adminClient
        .from('bid')
        .select('bidder_id')
        .eq('auction_id', auction.auction_id)
        .neq('bidder_id', winner.bidder_id);

      if (losers && losers.length > 0) {
        // 중복 제거 (같은 유저가 여러 번 입찰한 경우)
        const uniqueLoserIds = [...new Set(losers.map((l) => l.bidder_id))];

        for (const loserId of uniqueLoserIds) {
          await sendNotificationAsync({
            userId: loserId,
            auctionId: auction.auction_id,
            title: '경매가 종료되었습니다.',
            body: `"${auction.product.name}" 경매가 종료되었습니다. 최종 낙찰가: ${winner.bid_price.toLocaleString()}원`,
            type: 'auction_lost',
            data: {
              final_bid: winner.bid_price,
              product_name: auction.product.name,
            },
          });
        }
      }
    } else {
      // 입찰이 없는 경우 (판매자에게만 알림)
      await sendNotificationAsync({
        userId: auction.seller_id,
        auctionId: auction.auction_id,
        title: '경매가 종료되었습니다.',
        body: `"${auction.product.name}" 경매가 입찰 없이 종료되었습니다.`,
        type: 'auction_no_bid',
        data: {
          product_name: auction.product.name,
        },
      });
    }

    console.log(`경매 ${auction.auction_id} 알림 발송 완료`);
  } catch (error) {
    console.error(`경매 ${auction.auction_id} 처리 중 에러:`, error);
  }
}
