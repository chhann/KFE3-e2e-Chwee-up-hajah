import { adminClient } from '@/app/admin';
import { getAuctionStatus } from '@/shared/lib/utils/auctionStatus';
import { NextRequest, NextResponse } from 'next/server';

// pages/api/my-won-auctions.ts (가정)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // 1. 내가 참여한 모든 입찰 조회
    const { data: bidData, error: bidError } = await adminClient
      .from('bid')
      .select(
        `
        bid_price,
        auction:auction_id (
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
        )
      `
      )
      .eq('bidder_id', userId)
      .order('bid_time', { ascending: false });

    if (bidError) {
      return NextResponse.json({ error: bidError.message }, { status: 500 });
    }

    // 2. 낙찰받은 경매 필터링
    const wonAuctions = bidData
      .filter((bid: any) => {
        const auction = bid.auction;
        const now = new Date();
        const endTime = new Date(auction.end_time);

        return (
          endTime < now && // 경매 종료됨
          bid.bid_price === auction.current_price // 내 입찰가가 최종 낙찰가와 같음
        );
      })
      .map((bid: any) => {
        const { auction, bid_price } = bid; // bid_price도 함께 추출
        const { status: oldStatus, ...auctionRest } = auction;

        return {
          ...auctionRest,
          status: getAuctionStatus(auction),
          my_won_price: bid_price, // 낙찰받은 가격 (내 입찰가)
        };
      });

    // 만약 한 경매에 여러 번 입찰했는데 그 중 가장 높은 가격으로 낙찰받았다면,
    // 이 필터링은 해당 경매가 중복될 수 있으므로, 최종적으로 낙찰된 경매만 남도록 함
    const uniqueWonAuctions = Array.from(
      new Map(wonAuctions.map((item) => [item.id, item])).values()
    );

    return NextResponse.json(uniqueWonAuctions); // 중복 제거된 결과 반환
  } catch (error) {
    console.error('Unexpected error in won auctions fetch API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
