import { NextRequest, NextResponse } from 'next/server';

import { sendPushNotification } from '@/shared/lib/notification/pushService';

import { createApiClient } from '../../../server';

export async function POST(req: NextRequest) {
  console.log('✅ /api/chat/message-send POST 시작');
  const supabase = createApiClient(req);
  const { roomId, senderId, content, sent_at } = await req.json();

  if (!roomId || !senderId || !content) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  // ✅ 1. 메시지 저장
  const { error: messageError } = await supabase.from('message').insert({
    room_id: roomId,
    sender_id: senderId,
    content,
    sent_at,
    is_read: false,
  });

  if (messageError) {
    console.error('❌ 메시지 저장 오류:', messageError.message);
    return NextResponse.json({ error: '메시지 저장 실패' }, { status: 500 });
  }

  // ✅ 2. 수신자 ID 확인
  let receiverId: string;
  try {
    const { data: room, error: roomError } = await supabase
      .from('chatroom')
      .select('buyer_id, seller_id')
      .eq('room_id', roomId)
      .single();

    if (roomError) {
      console.error('❌ chatroom 조회 오류:', roomError.message);
      return NextResponse.json({ error: '채팅방 정보 조회 실패' }, { status: 500 });
    }

    if (!room) {
      return NextResponse.json({ error: '채팅방을 찾을 수 없음' }, { status: 404 });
    }

    receiverId = senderId === room.buyer_id ? room.seller_id : room.buyer_id;
    console.log('🔍 수신자 ID:', receiverId);
  } catch (err) {
    console.error('❌ chatroom 조회 중 예외 발생:', err);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }

  // ✅ 3. 푸시 알림 전송 (pushService 사용)
  const pushPayload = {
    title: '새 메시지 도착!',
    body: content,
    url: `/chat/${roomId}`,
  };

  try {
    const pushResult = await sendPushNotification(receiverId, pushPayload);
    console.log('✅ 푸시 알림 전송 결과:', pushResult.status);
    if (pushResult.status === 'failed') {
      console.error('❌ 푸시 전송 실패 상세:', pushResult.error);
    }
  } catch (err) {
    console.error('❌ 푸시 알림 전송 중 예외 발생:', err);
    // 푸시 실패가 전체 API 요청을 중단시키지 않도록 오류를 로깅만 함
  }

  console.log('✅ /api/chat/message-send POST 완료');
  return NextResponse.json({ success: true }, { status: 200 });
}
