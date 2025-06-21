// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { SignupSchema } from '../../../../lib/validators/auth';

export async function POST(req: Request) {
  const body = await req.json();

  const parse = SignupSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ errors: parse.error.flatten().fieldErrors }, { status: 400 });
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
