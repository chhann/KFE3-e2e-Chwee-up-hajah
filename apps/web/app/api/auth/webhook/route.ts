import { NextRequest, NextResponse } from 'next/server';
import { createSSRClient } from '../../../server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Supabase webhook 서명 검증 (실제 운영환경에서는 필수)
    // const signature = request.headers.get('x-webhook-signature')
    // ... 서명 검증 로직

    if (payload.type === 'user.created' && payload.record.email_confirmed_at) {
      // 이메일 인증 완료된 사용자의 프로필 생성
      const supabase = await createSSRClient();

      // 임시 데이터에서 프로필 정보 가져오기 또는 기본값 설정
      // 실제로는 별도 테이블이나 Redis 등에서 임시 저장된 데이터를 가져와야 함
      const { error } = await supabase.from('user').insert({
        id: payload.record.id,
        email: payload.record.email,
        username: `user_${payload.record.id.slice(0, 8)}`, // 임시 username
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('프로필 생성 실패:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook 처리 에러:', error);
    return NextResponse.json({ error: 'Webhook 처리 실패' }, { status: 500 });
  }
}
