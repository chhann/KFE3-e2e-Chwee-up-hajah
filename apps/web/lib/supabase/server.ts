// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';

/**
 * 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
 * SSR 환경에서 쿠키를 통해 사용자 세션 관리
 * @returns supabase URL, Key 그리고 cookie 반환
 */
export async function createClient() {
  // Next.js 15의 cookies() 함수로 쿠키 스토어 가져오기
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase 프로젝트 URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Service Key 아님!
    {
      cookies: {
        // 모든 쿠키를 가져오는 함수
        getAll() {
          return cookieStore.getAll();
        },
        // 쿠키 설정 함수 (현재는 빈 구현재, server에서 쿠키를?)
        setAll(cookiesToSet) {},
      },
    }
  );
}
