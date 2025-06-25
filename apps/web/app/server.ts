import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Server Component용
// SSR 단계에서 호출되어 쿠키를 이용해 유저 상태/데이터를 "읽기 전용"으로 가져오는 용도로 사용
export async function createSSRClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // SSR 환경에서 호출될 일이 없움. 아무것도 안함.
        },
      },
    }
  );
}

// API Route용
// 브라우저가 호출하는 엔드포인트 안에서 쓰이며,
// DB의 Create/Update/Delete 작업을 안전하게 수행하는 용도로 사용
export function createApiClient(request: NextRequest, response?: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            if (response) {
              response.cookies.set(name, value, options);
            }
          });
        },
      },
    }
  );
}
