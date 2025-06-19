import { supabase } from '../../../lib/supabase/supabase';
import type { SignupData, ValidationErrors } from '../model/types';

export class AuthService {
  static async checkEmailDuplicate(email: string): Promise<boolean> {
    if (!email.trim()) {
      throw new Error('이메일을 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('올바른 이메일 형식이 아닙니다.');
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email.trim())
        .maybeSingle(); // data: { email: string } | null

      if (error) {
        console.error('이메일 중복 확인 중 Supabase 에러:', error);
        throw new Error('이메일 중복 확인 중 오류 발생');
      }

      if (data && data.email) {
        throw new Error('이미 가입된 이메일입니다.');
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('이메일 중복 확인 중 오류 발생');
    }
  }

  static async checkUsernameDuplicate(username: string): Promise<boolean> {
    if (!username.trim()) {
      throw new Error('닉네임을 입력해주세요.');
    }

    const cleaned = username.trim();

    if (cleaned.length < 2) {
      throw new Error('닉네임은 2자 이상이어야 합니다.');
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(cleaned)) {
      throw new Error('닉네임은 특수문자 없이 입력해주세요.');
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', cleaned)
        .maybeSingle();

      if (error) {
        console.error('Supabase 에러:', error);
        throw new Error('닉네임 중복 확인 중 오류 발생');
      }

      if (data) {
        throw new Error('이미 사용 중인 닉네임입니다.');
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('닉네임 중복 확인 중 오류 발생');
    }
  }

  static validateSignupData(data: SignupData & { confirmPassword: string }): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!data.email) errors.email = '이메일을 입력해주세요.';
    if (!data.password) errors.password = '비밀번호를 입력해주세요.';
    if (!data.confirmPassword) errors.confirmPassword = '비밀번호 확인이 필요합니다.';
    if (!data.username) errors.username = '닉네임을 입력해주세요.';
    if (!data.address) errors.address = '주소를 입력해주세요.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (data.password && data.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  }

  static async signup(
    signupData: SignupData
  ): Promise<{ success: boolean; needsVerification: boolean }> {
    const { data: signupResult, error: signupError } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
    });

    if (signupError) throw new Error(signupError.message);

    // 이메일 인증이 필요한 경우
    if (!signupResult.session && signupResult.user) {
      return { success: true, needsVerification: true };
    }

    // 바로 로그인된 경우 (이메일 인증 비활성화된 경우)
    if (signupResult.session?.user) {
      const { error: insertError } = await supabase.from('user_profiles').insert({
        id: signupResult.session.user.id,
        email: signupData.email,
        username: signupData.username,
        address: signupData.address,
        address_detail: signupData.addressDetail,
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('[Profile INSERT 실패]', insertError);
        throw new Error(`프로필 저장 실패: ${insertError.message}`);
      }

      return { success: true, needsVerification: false };
    }

    throw new Error('회원가입 처리 중 오류가 발생했습니다.');
  }

  static async login(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(
        error.message === 'Invalid login credentials'
          ? '이메일 또는 비밀번호가 잘못되었습니다.'
          : error.message
      );
    }
  }
}
