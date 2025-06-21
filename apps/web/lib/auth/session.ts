// lib/auth/session.ts
import { createClient } from '../supabase/client';

/**
 * 현재 로그인된 사용자의 정보를 가져옵니다.
 * @returns Supabase User 객체 또는 null
 */
export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('[getCurrentUser] error:', error.message);
    return null;
  }

  return user;
}
