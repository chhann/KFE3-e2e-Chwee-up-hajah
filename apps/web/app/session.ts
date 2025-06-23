import { createClient } from './server'; // ✅ 경로 수정

export async function getCurrentUser() {
  const supabase = await createClient(); // ✅ await 추가

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
