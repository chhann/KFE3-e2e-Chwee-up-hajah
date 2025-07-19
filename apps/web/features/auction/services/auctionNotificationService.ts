import { adminClient } from '@/app/admin';
import { sendNotificationAsync } from '@/shared/lib/notification/sendNotification';

export async function processExpiredAuctions(auctions: any[]) {
  const results = [];

  for (const auction of auctions) {
    try {
      const result = await processExpiredAuction(auction);
      results.push(result);
    } catch (error) {
      console.error(`경매 ${auction.auction_id} 처리 중 에러:`, error);
      results.push({ success: false, auctionId: auction.auction_id, error });
    }
  }

  return results;
}

async function processExpiredAuction(auction: any) {
  // 중복 알림 체크
  if (await isDuplicateNotification(auction.auction_id)) {
    return { success: true, auctionId: auction.auction_id, message: '이미 처리됨' };
  }

  const winner = await findWinner(auction.auction_id);

  if (winner) {
    await notifyWinner(auction, winner);
    await notifyLosers(auction, winner);
  } else {
    await notifyNoWinner(auction);
  }

  return { success: true, auctionId: auction.auction_id };
}

// 이미 이 경매에 대한 알림을 보냈는지 확인
// auction_outbid는 경매 진행 중 입찰 알림이므로 제외
async function isDuplicateNotification(auctionId: string): Promise<boolean> {
  const { data } = await adminClient
    .from('notification')
    .select('notification_id')
    .eq('auction_id', auctionId)
    .neq('type', 'auction_outbid')
    .limit(1)
    .single();

  return !!data;
}

// 낙찰자 확인 (가장 높은 입찰가)
async function findWinner(auctionId: string) {
  const { data: winner } = await adminClient
    .from('bid')
    .select('*')
    .eq('auction_id', auctionId)
    .order('bid_price', { ascending: false })
    .order('bid_time', { ascending: false })
    .limit(1)
    .single();

  return winner;
}

// 낙찰자에게 알림
async function notifyWinner(auction: any, winner: any) {
  await sendNotificationAsync({
    userId: winner.bidder_id,
    auctionId: auction.auction_id,
    title: '경매가 낙찰되었습니다.',
    body: `"${auction.product.name}" 경매에서 낙찰되었습니다! 낙찰가: ${winner.bid_price.toLocaleString()}원`,
    type: 'auction_won',
    data: {
      winning_bid: winner.bid_price,
      product_name: auction.product.name,
    },
  });
}

// 낙찰 못한 유저들에게 알림
async function notifyLosers(auction: any, winner: any) {
  const { data: losers } = await adminClient
    .from('bid')
    .select('bidder_id')
    .eq('auction_id', auction.auction_id)
    .neq('bidder_id', winner.bidder_id);

  if (losers && losers.length > 0) {
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
}

// 입찰이 없는 경우 (판매자에게만 알림)
async function notifyNoWinner(auction: any) {
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
