import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';
import { createApiClient } from '@/app/server';
import { sendPushNotification } from '@/shared/lib/notification/pushService';

export async function PATCH(req: NextRequest) {
  const { roomId } = await req.json();

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase
    .from('chatroom')
    .update({ trade_status: 'completed' })
    .eq('room_id', roomId)
    .select('seller_id, buyer_id, product_name')
    .single();

  if (error) {
    console.error('[PATCH /api/chat/confirm-completion]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data && data.buyer_id && data.seller_id && data.product_name) {
    const { buyer_id, seller_id, product_name } = data;
    const notificationBody = `'${product_name}' 상품 거래가 완료되었습니다.`;
    const notificationTitle = '거래 완료';

    // 1. 데이터베이스에 알림 저장
    try {
      const notifications = [
        {
          user_id: buyer_id,
          type: 'trade_completed',
          title: notificationTitle,
          body: notificationBody,
          room_id: roomId,
          delivery_status: 'sent',
        },
        {
          user_id: seller_id,
          type: 'trade_completed',
          title: notificationTitle,
          body: notificationBody,
          room_id: roomId,
          delivery_status: 'sent',
        },
      ];
      await adminClient.from('notification').insert(notifications);
    } catch (notificationError) {
      console.error(
        '[PATCH /api/chat/confirm-completion] Failed to insert notification:',
        notificationError
      );
    }

    // 2. 푸시 알림 전송
    const pushPayload = {
      title: notificationTitle,
      body: notificationBody,
      url: `/chat/${roomId}`,
    };

    const usersToNotify = [buyer_id, seller_id];

    for (const userId of usersToNotify) {
      try {
        const pushResult = await sendPushNotification(userId, pushPayload);
        console.log(`✅ [${userId}] 푸시 알림 전송 결과:`, pushResult.status);
        if (pushResult.status === 'failed') {
          console.error(`❌ [${userId}] 푸시 전송 실패 상세:`, pushResult.error);
        }
      } catch (err) {
        console.error(`❌ [${userId}] 푸시 알림 전송 중 예외 발생:`, err);
      }
    }
  }

  return NextResponse.json(data);
}
