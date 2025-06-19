// apps/web/features/authentication/api/login.ts
import { supabase } from '../../../lib/supabase/supabase';

export class LoginService {
  static async login(email: string, password: string): Promise<string> {
    if (!email.trim() || !password.trim()) {
      throw new Error('이메일과 비밀번호를 모두 입력해주세요.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      throw new Error(`로그인 실패: ${error.message}`);
    }

    if (!data.session) {
      throw new Error('세션이 생성되지 않았습니다.');
    }

    return data.user.id; // 로그인 성공 시 사용자 ID 반환
  }

  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('로그아웃 중 오류가 발생했습니다.');
    }
  }

  static async getCurrentUser(): Promise<string | null> {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('현재 사용자 조회 실패:', error.message);
      return null;
    }

    return data.user?.id ?? null;
  }
}
