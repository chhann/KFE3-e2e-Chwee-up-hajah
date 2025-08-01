import { NextResponse } from 'next/server';

import { sendHotDealNotificationToEligibleUsers } from '@/features/hot-deal/services/hotDealNotificationService';

import { adminClient } from '@/app/admin';

const NOTIFICATION_TYPE = 'D_MINUS_1'; // 이 크론잡은 항상 'D_MINUS_1' 타입만 처리

// 매일 특정 시간에 실행되어, 다음 날 시작하는 핫딜에 대한 알림을 보냅니다.
export async function GET() {
  try {
    const now = new Date();

    // 1. "내일"의 시작과 끝 시간 계산 (UTC 기준)
    const tomorrowStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0)
    );
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    // 2. 내일 시작하는 활성화된 모든 핫딜 조회
    const { data: upcomingDeals, error: dealsError } = await adminClient
      .from('hot_deals')
      .select('*')
      .eq('is_active', true)
      .gte('start_time', tomorrowStart.toISOString())
      .lt('start_time', tomorrowEnd.toISOString());

    if (dealsError) throw dealsError;

    // 3. 각 핫딜에 대해 알림 발송
    for (const deal of upcomingDeals) {
      const startDate = new Date(deal.start_time);
      const payload = {
        title: `[광고] ${deal.name} 핫딜 시작 1일 전!`,
        body: `내일 ${startDate.getHours()}시에 특가! 놓치지 마세요!`,
      };
      // 공용 서비스 함수 호출
      await sendHotDealNotificationToEligibleUsers(deal, NOTIFICATION_TYPE, payload);
    }

    return NextResponse.json({ success: true, processedDeals: upcomingDeals.length });
  } catch (error: any) {
    console.error('[Cron Job Error: Daily Deal Notifications]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
