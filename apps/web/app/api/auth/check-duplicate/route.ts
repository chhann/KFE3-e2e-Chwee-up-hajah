import { NextRequest, NextResponse } from 'next/server';
import { createSSRClient } from '../../../server';

export async function POST(request: NextRequest) {
  try {
    // 요청 데이터 파싱 및 검증
    const { type, value } = await request.json();

    if (!type || !value) {
      return NextResponse.json({ error: '필수 파라미터가 누락되었습니다.' }, { status: 400 });
    }

    // 서버용 supabase 클라이언트 생성
    const supabase = await createSSRClient();

    // 타입별 검증 로직
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return NextResponse.json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
      }

      // 데이터 베이스 중복 확인
      const { data, error } = await supabase
        .from('user')
        .select('email')
        .eq('email', value.trim())
        .maybeSingle();

      if (error) {
        console.error('이메일 중복 확인 에러:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
      }

      if (data) {
        return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 });
      }
    }

    // 닉네임 검증
    if (type === 'username') {
      const cleaned = value.trim();

      if (cleaned.length < 2) {
        return NextResponse.json({ error: '닉네임은 2자 이상이어야 합니다.' }, { status: 400 });
      }

      const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
      if (!nicknameRegex.test(cleaned)) {
        return NextResponse.json(
          { error: '닉네임은 특수문자 없이 입력해주세요.' },
          { status: 400 }
        );
      }

      // 데이터 베이스 중복 확인
      const { data, error } = await supabase
        .from('user')
        .select('username')
        .eq('username', cleaned)
        .maybeSingle();

      if (error) {
        console.error('닉네임 중복 확인 에러:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
      }

      if (data) {
        return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('중복 확인 API 에러:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
