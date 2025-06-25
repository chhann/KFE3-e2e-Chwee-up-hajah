// features/authentication/api/me.ts
import { createClient } from '../../../app/client';

/**
 * 현재 로그인한 사용자 정보를 가져오는 서비스
 */
export class MeService {
  static async getCurrentUser() {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error('로그인이 필요합니다.');
    }

    return user;
  }
}
