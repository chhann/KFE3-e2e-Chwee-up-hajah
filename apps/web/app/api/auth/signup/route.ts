// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignupServerSchema } from '../../../../lib/validators/auth';
import { adminClient } from '../../../admin';
import { createApiClient } from '../../../server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = SignupServerSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        {
          error: '입력값을 확인해주세요.',
          errors: parse.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });
    const supabase = createApiClient(req, response);

    const { email, password, username, address, addressDetail } = parse.data;

    // 1. Supabase Auth에 회원가입
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, address, addressDetail },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message ?? '회원가입 실패' }, { status: 400 });
    }

    // 2. 사용자 메타데이터를 별도의 `user` 테이블에 삽입
    const { error: insertError } = await adminClient.from('user').insert({
      user_id: data.user.id,
      password,
      email,
      score: 0,
      avatar: '',
      username,
      address,
      address_detail: addressDetail,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('❌ 사용자 테이블 저장 실패:', insertError);
      return NextResponse.json({ error: '회원정보 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      needsVerification: !data.user.email_confirmed_at,
    });
  } catch (error) {
    console.error('회원가입 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
