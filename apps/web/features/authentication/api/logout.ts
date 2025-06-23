// features/authentication/api/logout.ts
import { createSSRClient } from '../../../app/server';

/**
 * Supabase를 통해 현재 세션을 로그아웃 처리합니다.
 * 클라이언트 쿠키 삭제는 클라이언트 쪽에서 처리해야 합니다.
 */
export class LogoutService {
  static async logout(): Promise<void> {
    const supabase = await createSSRClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(`[LogoutService] ${error.message}`);
    }
  }
}
