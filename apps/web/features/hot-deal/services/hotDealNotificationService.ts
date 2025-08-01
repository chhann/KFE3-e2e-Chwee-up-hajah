import { adminClient } from '@/app/admin';

import { sendPushNotification } from '@/shared/lib/notification/pushService';
import { HotDeal } from '@/shared/types/db';

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

/**
 * 핫딜 알림을 받을 자격이 있는 사용자에게 푸시 알림을 보냅니다.
 * 중복 발송을 방지하고, 발송 후 기록을 남깁니다.
 * @param deal - 알림을 보낼 HotDeal 객체
 * @param type - 보낼 알림의 종류 (e.g., 'D_MINUS_1', 'H_MINUS_1')
 * @param payload - 알림에 포함될 제목과 본문 { title: string, body: string }
 */
export async function sendHotDealNotificationToEligibleUsers(
  deal: HotDeal,
  type: string,
  payload: { title: string; body: string }
) {
  // 1. 중복 발송 확인
  const { data: existing, error: checkError } = await adminClient
    .from('hot_deal_notifications')
    .select('id')
    .eq('hot_deal_id', deal.id)
    .eq('notification_type', type)
    .single();

  if (checkError && checkError.code !== 'PGRST116') throw checkError;
  if (existing) return; // 이미 발송된 알림이면 조용히 종료

  // 2. 알림 대상자 조회
  const { data: allUsers, error: usersError } = await adminClient
    .from('user')
    .select('user_id, grade');
  if (usersError) {
    console.error(`[Notification Service] Error fetching users:`, usersError);
    throw usersError;
  }

  const minGradePriority = GRADE_PRIORITY[deal.min_user_grade];
  if (minGradePriority === undefined) {
    console.error(
      `[Notification Service] Invalid min_user_grade: ${deal.min_user_grade} for deal ${deal.id}`
    );
    return;
  }

  const users = allUsers.filter((user) => {
    const userGradePriority = GRADE_PRIORITY[user.grade] || 0;
    return userGradePriority >= minGradePriority;
  });

  if (!users || users.length === 0) return;

  // 3. 알림 발송 (URL 경로를 일관되게 수정)
  const url = `/hot-deals/${deal.id}`;
  for (const user of users) {
    await sendPushNotification(user.user_id, { ...payload, url });
  }

  // 4. 발송 기록 저장
  const { error: insertError } = await adminClient
    .from('hot_deal_notifications')
    .insert({ hot_deal_id: deal.id, notification_type: type });

  if (insertError) {
    console.error(`[Notification Service] Error inserting notification record:`, insertError);
    throw insertError;
  }

  console.log(`[Notification Service] Sent: ${type} for deal ${deal.id} to ${users.length} users`);
}
