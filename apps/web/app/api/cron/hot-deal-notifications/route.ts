import { NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

import { sendPushNotification } from '@/shared/lib/notification/pushService';
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

  // 2. 시작 2시간 전 알림
  const hMinus2 = new Date(startDate.getTime() - 2 * 60 * 60 * 1000);
  if (now >= hMinus2 && now < startDate) {
    await checkAndSend(deal, NOTIFICATION_TYPES.H_MINUS_2, {
      title: `[광고] ${deal.name} 핫딜, 1시간 뒤 시작!`,
      body: `잠시 후 ${startDate.getHours()}시에 오픈! 구매 준비 서두르세요!`,
    });
  }

  // 3. 핫딜 시작 알림
  if (now >= startDate && now < new Date(startDate.getTime() + 5 * 60 * 1000)) {
    // 시작 후 5분 내
    await checkAndSend(deal, NOTIFICATION_TYPES.START, {
      title: `${deal.name} 핫딜 시작!`,
      body: `지금 바로 특가 상품을 확인하세요!`,
    });
  }

  // --- 핫딜 진행 중 알림 ---
  if (now > startDate && now < endDate) {
    // 4. 재고 10% 이하 알림
    if (deal.current_quantity / deal.total_quantity <= 0.1) {
      await checkAndSend(deal, NOTIFICATION_TYPES.LOW_STOCK, {
        title: `${deal.name} 핫딜 매진 임박!`,
        body: `재고가 얼마 남지 않았어요! 서두르세요!`,
      });
    }

    // 5. 종료 1시간 전 알림
    const endImminent = new Date(endDate.getTime() - 60 * 60 * 1000);
    if (now >= endImminent) {
      await checkAndSend(deal, NOTIFICATION_TYPES.END_IMMINENT, {
        title: `${deal.name} 핫딜 종료 임박!`,
        body: `1시간 뒤 핫딜이 종료됩니다. 마지막 기회를 놓치지 마세요!`,
      });
    }
  }
}

// 알림 발송 여부 확인 및 실제 발송 함수
async function checkAndSend(deal: HotDeal, type: string, payload: { title: string; body: string }) {
  // 1. 중복 발송 확인
  const { data: existing, error: checkError } = await adminClient
    .from('hot_deal_notifications')
    .select('id')
    .eq('hot_deal_id', deal.id)
    .eq('notification_type', type)
    .single();

  if (checkError && checkError.code !== 'PGRST116') throw checkError; // PGRST116: row not found
  if (existing) return; // 이미 발송됨

  // 등급 우선순위 맵
  const GRADE_PRIORITY: { [key: string]: number } = {
    흙: 1,
    돌멩이: 2,
    에벌레: 3,
    씨앗: 4,
    새싹: 5,
    나무: 6,
    숲: 7,
  };

  // 2. 알림 대상자 조회 (user 테이블 사용 및 애플리케이션 레벨 필터링)
  const { data: allUsers, error: usersError } = await adminClient
    .from('user')
    .select('user_id, grade');

  if (usersError) throw usersError;

  // 핫딜에 설정된 최소 등급의 우선순위를 가져옴
  const minGradePriority = GRADE_PRIORITY[deal.min_user_grade];
  if (minGradePriority === undefined) return; // 핫딜에 유효하지 않은 등급이 설정되어 있으면 중단

  // 사용자의 등급이 최소 등급 이상인 경우만 필터링
  const users = allUsers.filter((user) => {
    const userGradePriority = GRADE_PRIORITY[user.grade] || 0;
    return userGradePriority >= minGradePriority;
  });

  if (!users || users.length === 0) return;

  // 3. 알림 발송 및 기록
  for (const user of users) {
    await sendPushNotification(user.user_id, { ...payload, url: `/hotdeal/${deal.id}/detail` });
  }

  // 4. 발송 기록 저장
  const { error: insertError } = await adminClient
    .from('hot_deal_notifications')
    .insert({ hot_deal_id: deal.id, notification_type: type });

  if (insertError) throw insertError;

  console.log(`[Hot Deal Notification] Sent: ${type} for deal ${deal.id} to ${users.length} users`);
}
