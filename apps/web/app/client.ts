'use client';
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

// 싱글톤으로 토큰 중복 방지
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * 브라우저(클라이언트)에서 사용할 Supabase 클라이언트 생성
 * 클라이언트 컴포넌트, 이벤트 핸들러에서 사용
 * @returns Supabase URL, Key 반환
 */

export function createClient() {
  // 이미 생성된 클라이언트가 있으면 재사용
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseClient;
}
