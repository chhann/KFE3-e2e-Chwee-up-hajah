import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

import { createApiClient } from '../../../server';

webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  console.log('✅ /api/message POST 시작');
  const supabase = createApiClient(req);
  const { roomId, senderId, content, sent_at } = await req.json();

  if (!roomId || !senderId || !content) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  const { error } = await supabase.from('message').insert({
    room_id: roomId,
    sender_id: senderId,
    content,
    sent_at,
    is_read: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ✅ 1. 채팅방 정보 조회

  let room = null;

  try {
    const { data, error } = await supabase
      .from('chatroom')
      .select('buyer_id, seller_id')
      .eq('room_id', roomId)
      .single();

    if (error) {
      console.error('❌ chatroom 조회 오류:', error.message);
      return NextResponse.json({ error: '채팅방 정보 조회 실패' }, { status: 500 });
    }

    room = data;
    console.log('📦 room 결과:', room);
  } catch (err) {
    console.error('❌ chatroom 조회 중 예외 발생:', err);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }

  const receiverId = senderId === room.buyer_id ? room.seller_id : room.buyer_id;
  // const receiverId = senderId; // 본인에게 보내기 push 테스트
  console.log('🔍 receiverId:', receiverId);

  // ✅ 2. 수신자 구독 정보 조회
  const { data: subscriptions, error: subscriptionError } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', receiverId)
    .eq('is_active', true)
    .order('updated_at', { ascending: false });

  if (subscriptionError) {
    console.error('❌ 푸시 구독 조회 오류:', subscriptionError.message);
    return NextResponse.json({ error: '푸시 구독 조회 실패' }, { status: 500 });
  }

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ success: true, message: '구독 정보 없음, 푸시 생략' });
  }

  console.log('📦 subscriptions:', subscriptions);

  // ✅ 3. 푸시 알림 전송
  const pushPayload = JSON.stringify({
    title: '새 메시지 도착!',
    body: content,
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

  // 실패 로그 출력
  results.forEach((result, idx) => {
    if (result.status === 'rejected') {
      console.error(`❌ [${idx}] 푸시 전송 실패:`, result.reason);
    }
  });

  console.log('✅ 푸시 알림 전송 시도 완료');

  return NextResponse.json({ success: true }, { status: 200 });
}
