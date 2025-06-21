// lib/validators/duplicateCheck.ts
import { createClient } from '../supabase/server';

export async function checkEmailDuplicate(email: string) {
  const supabase = await createClient();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: 400, error: '올바른 이메일 형식이 아닙니다.' };
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('email')
    .eq('email', email.trim())
    .maybeSingle();

  if (error) return { status: 500, error: '서버 오류가 발생했습니다.' };
  if (data) return { status: 409, error: '이미 가입된 이메일입니다.' };

  return { status: 200, success: true };
}

export async function checkUsernameDuplicate(username: string) {
  const supabase = await createClient();

  const cleaned = username.trim();

  if (cleaned.length < 2) {
    return { status: 400, error: '닉네임은 2자 이상이어야 합니다.' };
  }

  const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
  if (!nicknameRegex.test(cleaned)) {
    return { status: 400, error: '닉네임은 특수문자 없이 입력해주세요.' };
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .select('username')
    .eq('username', cleaned)
    .maybeSingle();

  if (error) return { status: 500, error: '서버 오류가 발생했습니다.' };
  if (data) return { status: 409, error: '이미 사용 중인 닉네임입니다.' };

  return { status: 200, success: true };
}
