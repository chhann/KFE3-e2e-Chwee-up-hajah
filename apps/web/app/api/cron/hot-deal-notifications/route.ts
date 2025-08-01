import { NextResponse } from 'next/server';

import { sendHotDealNotificationToEligibleUsers } from '@/features/hot-deal/services/hotDealNotificationService';

import { adminClient } from '@/app/admin';

import { HotDeal } from '@/shared/types/db';

// 알림 타입 정의
const NOTIFICATION_TYPES = {
  H_MINUS_2: 'H_MINUS_2', // 시작 2시간 전
  START: 'START', // 시작 시
  LOW_STOCK: 'LOW_STOCK', // 재고 10% 이하
  END_IMMINENT: 'END_IMMINENT', // 종료 1시간 전
};

export async function GET() {
  try {
    const now = new Date();

    // 1. 활성화된 모든 핫딜 조회
    const { data: hotDeals, error: hotDealsError } = await adminClient
      .from('hot_deals')
      .select('*')
      .eq('is_active', true)
      .gt('end_time', now.toISOString()); // 종료되지 않은 핫딜

    if (hotDealsError) throw hotDealsError;

    // 2. 각 핫딜에 대해 알림 조건 확인 및 발송
    for (const deal of hotDeals) {
      await processNotificationsForDeal(deal, now);
    }

    return NextResponse.json({ success: true, processedDeals: hotDeals.length });
  } catch (error: any) {
    console.error('[Cron Job Error: Hot Deal Notifications]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 개별 핫딜에 대한 알림 처리
async function processNotificationsForDeal(deal: HotDeal, now: Date) {
  const startDate = new Date(deal.start_time);
  const endDate = new Date(deal.end_time);

  // --- 각 알림 유형별 조건 확인 ---

  // 시작 2시간 전 알림
  const hMinus2 = new Date(startDate.getTime() - 2 * 60 * 60 * 1000);
  if (now >= hMinus2 && now < startDate) {
    await sendHotDealNotificationToEligibleUsers(deal, NOTIFICATION_TYPES.H_MINUS_2, {
      title: `[광고] ${deal.name} 핫딜, 2시간 뒤 시작!`,
      body: `잠시 후 ${startDate.getHours()}시에 오픈! 구매 준비 서두르세요!`,
    });
  }

  // 핫딜 시작 알림
  if (now >= startDate && now < new Date(startDate.getTime() + 5 * 60 * 1000)) {
    // 시작 후 5분 내
    await sendHotDealNotificationToEligibleUsers(deal, NOTIFICATION_TYPES.START, {
      title: `${deal.name} 핫딜 시작!`,
      body: `지금 바로 특가 상품을 확인하세요!`,
    });
  }

  // --- 핫딜 진행 중 알림 ---
  if (now > startDate && now < endDate) {
    // 재고 10% 이하 알림
    if (deal.current_quantity / deal.total_quantity <= 0.1) {
      await sendHotDealNotificationToEligibleUsers(deal, NOTIFICATION_TYPES.LOW_STOCK, {
        title: `${deal.name} 핫딜 매진 임박!`,
        body: `재고가 얼마 남지 않았어요! 서두르세요!`,
      });
    }

    // 종료 1시간 전 알림
    const endImminent = new Date(endDate.getTime() - 60 * 60 * 1000);
    if (now >= endImminent) {
      await sendHotDealNotificationToEligibleUsers(deal, NOTIFICATION_TYPES.END_IMMINENT, {
        title: `${deal.name} 핫딜 종료 임박!`,
        body: `1시간 뒤 핫딜이 종료됩니다. 마지막 기회를 놓치지 마세요!`,
      });
    }
  }
}
