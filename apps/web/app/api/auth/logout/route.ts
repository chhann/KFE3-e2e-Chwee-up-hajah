// app/api/auth/logout/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Next.js 13+ App Router
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const response = NextResponse.json({ message: '로그아웃 완료' });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set: (name: string, value: string, options?: { maxAge?: number }) => {
          response.cookies.set({
            name,
            value,
            httpOnly: true,
            path: '/',
            maxAge: options?.maxAge,
          });
        },
        remove: (name: string) => {
          response.cookies.set({
            name,
            value: '',
            maxAge: 0,
            path: '/',
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return response;
}
