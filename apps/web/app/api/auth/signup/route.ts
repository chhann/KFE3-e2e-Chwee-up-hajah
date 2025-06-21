// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { SignupServerSchema } from '../../../../lib/validators/auth'; // SignupSchema -> SignupServerSchema로 변경

export async function POST(req: Request) {
  const body = await req.json();

  // SignupServerSchema 사용 (confirmPassword 필드가 없음)
  const parse = SignupServerSchema.safeParse(body);
  if (!parse.success) {
    console.log('Validation errors:', parse.error.flatten().fieldErrors); // 디버깅용
    return NextResponse.json(
      {
        error: '입력값을 확인해주세요.',
        errors: parse.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const supabase = await createClient();
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
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, needsVerification: true });
}
