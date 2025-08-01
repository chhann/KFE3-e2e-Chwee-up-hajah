import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

import { adminClient } from '@/app/admin';
import { createApiClient } from '@/app/server';

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO_EMAIL!}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function PATCH(req: NextRequest) {
  const { roomId } = await req.json();

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  const supabase = createApiClient(req);

  const { data, error } = await supabase
    .from('chatroom')
    .update({ trade_status: 'ongoing' })
    .eq('room_id', roomId)
    .select('seller_id, product_name')
    .single();

  if (error) {
    console.error('[PATCH /api/chat/reject-completion]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data && data.seller_id && data.product_name) {
    const receiverId = data.seller_id;
    const { product_name: productName } = data;
    const notificationBody = `'${productName}' 상품에 대한 거래 완료 요청이 거절되었습니다.`;

    // 1. 데이터베이스에 알림 저장
    try {
      await adminClient.from('notification').insert({
        user_id: receiverId,
        type: 'trade_rejected',
        title: '거래 완료 요청 거절',
        body: notificationBody,
        room_id: roomId,
        delivery_status: 'not_subscribed',
      });
    } catch (notificationError) {
      console.error(
        '[PATCH /api/chat/reject-completion] Failed to insert notification:',
        notificationError
      );
    }

    // 2. 푸시 알림 전송
    const { data: subscriptions, error: subscriptionError } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .eq('user_id', receiverId)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (subscriptionError) {
      console.error('❌ 푸시 구독 조회 오류:', subscriptionError.message);
    }

    if (subscriptions && subscriptions.length > 0) {
      console.log('📦 subscriptions:', subscriptions);

      const pushPayload = JSON.stringify({
        title: '거래 완료 요청 거절',
        body: notificationBody,
        url: `/chat/${roomId}`,
      });

      const results = await Promise.allSettled(
        subscriptions.map((subscription) =>
          webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
              },
            },
            pushPayload
          )
        )
      );

      results.forEach((result, idx) => {
        if (result.status === 'rejected') {
          console.error(`❌ [${idx}] 푸시 전송 실패:`, result.reason);
        }
      });
      console.log('✅ 푸시 알림 전송 시도 완료');
    } else {
      console.log('구독 정보 없음, 푸시 생략');
    }
  }

  return NextResponse.json(data);
}
