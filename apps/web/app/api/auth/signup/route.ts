// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignupServerSchema } from '../../../../lib/validators/auth';
import { createApiClient } from '../../../server'; // ✅ createApiClient 사용

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parse = SignupServerSchema.safeParse(body);
    if (!parse.success) {
      console.log('Validation errors:', parse.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          error: '입력값을 확인해주세요.',
          errors: parse.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });
    const supabase = createApiClient(req, response); // ✅ API 클라이언트 사용

    const { email, password, username, address, addressDetail } = parse.data;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, address, addressDetail },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      needsVerification: !data.user?.email_confirmed_at,
    });
  } catch (error) {
    console.error('Signup route error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
