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

    const { data: bidData, error } = await adminClient
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

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 데이터 구조 평면화 + 입찰 정보 추가
    const result = (bidData || [])
      .map((item: any) => {
        const { auction, bid_price } = item;
        const { status: oldStatus, ...auctionRest } = auction;

        return {
          ...auctionRest,
          status: getAuctionStatus(auction),
          my_bid_price: bid_price,
        };
      })
      .filter((item) => item.status !== 'end');

    // 중복 제거 (한 경매에 여러 번 입찰한 경우)
    const uniqueMyParticipatedAuctions = Array.from(
      new Map(result.map((item) => [item.auction_id, item])).values()
    );

    return NextResponse.json(uniqueMyParticipatedAuctions); // 중복 제거된 결과 반환
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
