// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { LogoutService } from '../../../../features/authentication/api/logout';

/**
 * Supabase 세션 로그아웃 API
 */
export async function POST() {
  try {
    await LogoutService.logout();

    // 쿠키는 서버 측에서 직접 삭제하지 않기 때문에 클라이언트에서 처리
    return NextResponse.json({ message: '로그아웃 완료' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
