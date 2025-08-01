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
      // 구매자에게 알림
      await adminClient.from('notification').insert({
        user_id: buyer_id,
        type: 'trade_completed',
        title: notificationTitle,
        body: notificationBody,
        room_id: roomId,
        delivery_status: 'sent',
      });

      // 판매자에게 알림
      await adminClient.from('notification').insert({
        user_id: seller_id,
        type: 'trade_completed',
        title: notificationTitle,
        body: notificationBody,
        room_id: roomId,
        delivery_status: 'sent',
      });
    } catch (notificationError) {
      console.error(
        '[PATCH /api/chat/confirm-completion] Failed to insert notification:',
        notificationError
      );
    }

    // 2. 푸시 알림 전송
    const pushPayload = JSON.stringify({
      title: notificationTitle,
      body: notificationBody,
      url: `/chat/${roomId}`,
    });

    const usersToNotify = [buyer_id, seller_id];

    for (const userId of usersToNotify) {
      const { data: subscriptions, error: subscriptionError } = await supabase
        .from('push_subscriptions')
        .select('endpoint, p256dh, auth')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (subscriptionError) {
        console.error(`❌ ${userId}에 대한 푸시 구독 조회 오류:`, subscriptionError.message);
        continue; // 다음 사용자로 넘어감
      }

      if (subscriptions && subscriptions.length > 0) {
        console.log(`📦 ${userId}에 대한 구독 정보:`, subscriptions);

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
            console.error(`❌ [${userId}-${idx}] 푸시 전송 실패:`, result.reason);
          }
        });
        console.log(`✅ ${userId}에게 푸시 알림 전송 시도 완료`);
      } else {
        console.log(`${userId}에 대한 구독 정보 없음, 푸시 생략`);
      }
    }
  }

  return NextResponse.json(data);
}
