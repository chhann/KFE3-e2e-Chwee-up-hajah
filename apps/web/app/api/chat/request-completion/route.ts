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
    .update({ trade_status: 'requested' })
    .eq('room_id', roomId)
    .select('buyer_id, product_name') // 필요한 컬럼만 선택
    .single();

  if (error) {
    console.error('[PATCH /api/chat/request-completion]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data && data.buyer_id && data.product_name) {
    const receiverId = data.buyer_id;
    const { product_name: productName } = data;
    const notificationTitle = '거래 완료 요청';
    const notificationBody = `'${productName}' 상품에 대한 거래 완료 요청이 도착했습니다.`;

    // 1. 데이터베이스에 알림 저장
    try {
      await adminClient.from('notification').insert({
        user_id: receiverId,
        type: 'trade_request',
        title: notificationTitle,
        body: notificationBody,
        room_id: roomId,
        delivery_status: 'not_subscribed', // This will be updated by the push service if successful
      });
    } catch (notificationError) {
      console.error(
        '[PATCH /api/chat/request-completion] Failed to insert notification:',
        notificationError
      );
    }

    // 2. 푸시 알림 전송
    const pushPayload = {
      title: notificationTitle,
      body: notificationBody,
      url: `/chat/${roomId}`,
    };

    try {
      const pushResult = await sendPushNotification(receiverId, pushPayload);
      console.log(`✅ [${receiverId}] 푸시 알림 전송 결과:`, pushResult.status);
      if (pushResult.status === 'failed') {
        console.error(`❌ [${receiverId}] 푸시 전송 실패 상세:`, pushResult.error);
      }
    } catch (err) {
      console.error(`❌ [${receiverId}] 푸시 알림 전송 중 예외 발생:`, err);
    }
  }

  return NextResponse.json(data);
}
