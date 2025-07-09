import { adminClient } from '@/app/admin';
import { getAuctionStatus } from '@/shared/lib/utils/auctionStatus';
import { NextRequest, NextResponse } from 'next/server';

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
        const auctionStatus = getAuctionStatus(auction);

        return (
          auctionStatus === 'end' && // getAuctionStatus로 종료 확인
          bid.bid_price === auction.current_price // 내 입찰가가 최종 낙찰가와 같음
        );
      })
      .map((bid: any) => {
        const { auction, bid_price } = bid;
        const { status: oldStatus, ...auctionRest } = auction;

        return {
          ...auctionRest,
          status: 'end',
          my_won_price: bid_price,
        };
      });

    // 3. 중복 제거 (한 경매에 여러 번 입찰한 경우)
    const uniqueWonAuctions = Array.from(
      new Map(wonAuctions.map((item) => [item.auction_id, item])).values()
    );

    return NextResponse.json(uniqueWonAuctions); // 중복 제거된 결과 반환
  } catch (error) {
    console.error('Unexpected error in won auctions fetch API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
