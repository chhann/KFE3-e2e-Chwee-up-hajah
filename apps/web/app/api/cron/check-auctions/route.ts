import { NextRequest, NextResponse } from 'next/server';

import { processExpiredAuctions } from '@/features/auction/services/auctionNotificationService';

import { isToday, parseUTCDate } from '@/shared/lib/utils/parseUTCDate';

import { adminClient } from '@/app/admin';

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

    // 2. 오늘 종료된 경매 필터링
    const todayExpiredAuctions = expiredAuctions.filter((auction) => {
      const endTime = parseUTCDate(auction.end_time);
      return endTime && new Date() > endTime && isToday(endTime);
    });

    // 3. 비즈니스 로직 실행
    const results = await processExpiredAuctions(todayExpiredAuctions);

    return NextResponse.json({
      success: true,
      processed: todayExpiredAuctions.length,
      results,
    });
  } catch (error) {
    console.error('크론잡 에러:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
