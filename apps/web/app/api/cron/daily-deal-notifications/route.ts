import { NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

import { sendPushNotification } from '@/shared/lib/notification/pushService';
import { HotDeal } from '@/shared/types/db';

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
      // 시작 시간을 파싱하여 알림 메시지에 사용
      const startDate = new Date(deal.start_time);
      const payload = {
        title: `[광고] ${deal.name} 핫딜 시작 1일 전!`,
        body: `내일 ${startDate.getHours()}시에 특가! 놓치지 마세요!`,
      };
      await checkAndSendDailyNotification(deal, payload);
    }

    return NextResponse.json({ success: true, processedDeals: upcomingDeals.length });
  } catch (error: any) {
    console.error('[Cron Job Error: Daily Deal Notifications]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 알림 발송 여부 확인 및 실제 발송 함수
async function checkAndSendDailyNotification(
  deal: HotDeal,
  payload: { title: string; body: string }
) {
  // 1. 중복 발송 확인
  const { data: existing, error: checkError } = await adminClient
    .from('hot_deal_notifications')
    .select('id')
    .eq('hot_deal_id', deal.id)
    .eq('notification_type', NOTIFICATION_TYPE)
    .single();

  if (checkError && checkError.code !== 'PGRST116') throw checkError;
  if (existing) return;

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

  // 2. 알림 대상자 조회
  const { data: allUsers, error: usersError } = await adminClient
    .from('user')
    .select('user_id, grade');
  if (usersError) throw usersError;

  const minGradePriority = GRADE_PRIORITY[deal.min_user_grade];
  if (minGradePriority === undefined) return;

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
    .insert({ hot_deal_id: deal.id, notification_type: NOTIFICATION_TYPE });

  if (insertError) throw insertError;

  console.log(
    `[Daily Notification] Sent: ${NOTIFICATION_TYPE} for deal ${deal.id} to ${users.length} users`
  );
}
