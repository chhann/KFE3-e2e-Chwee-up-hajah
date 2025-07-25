import { createApiClient, createSSRClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 로그인 관련 서버 사이드 서비스
 * Supabase Auth를 사용한 인증 처리를 담당
 */
export class LoginService {
  /**
   * 사용자 로그인 처리
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @returns 로그인 성공 시 사용자 ID
   * @throws 로그인 실패 시 Error 발생
   *
   * 처리 과정:
   *  1. Supabase 클라이언트 생성
   *  2. 이메일/패스워드로 인증 시도
   *  3. 인증 실패 시 에러 처리
   *  4. 사용자 데이터 검증
   *  5. 사용자 ID 반환
   */
  static async login(
    email: string,
    password: string,
    req: NextRequest,
    res: NextResponse
  ): Promise<string> {
    // Supabase API 클라이언트 생성(토근 생성, 쓰기 작업)
    const supabase = createApiClient(req, res);

    // Supabase Auth로 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 인증 오류 처리
    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('이메일 또는 비밀번호를 확인해주세요.');
      }
      throw new Error(error.message);
    }

    // 사용자 데이터 존재 여부 확인
    // Supabase에서 인증은 성공했지만 사용자 객체가 없는 경우 처리
    if (!data.user) {
      throw new Error('로그인에 실패했습니다.');
    }

    // 로그인 성공 시 사용자 ID 반환
    return data.user.id;
  }

  /**
   * 사용자 로그아웃 처리
   *
   * @throws 로그아웃 실패 시 Error 발생
   *
   * 처리 과정:
   *  1. Supabase 클라이언트 생성
   *  2. 현재 세션 종료
   *  3. 오류 발생 시 예외 처리
   *
   * 참고: 서버에서 signOut 호출 시 쿠키 삭제는 클라이언트에서 처리해야 함
   */
  static async logout(): Promise<void> {
    // Supabase 서버 클라이언트 생성
    const supabase = await createSSRClient();

    // 현재 사용자 세션 종료
    const { error } = await supabase.auth.signOut();

    // 로그아웃 오류 처리
    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 현재 로그인된 사용자 정보 조회
   *
   * @returns 현재 사용자 객체(User | null)
   * @throws 사용자 정보 조회 실패 시 Error 발생
   *
   * 처리 과정:
   *  1. Supabase 클라이언트 생성
   *  2. 현재 세션에서 사용자 정보 조회
   *  3. 오류 발생 시 예외 처리
   *  4. 사용자 객체 반환(로그인 되지 않은 경우 null)
   *
   * 사용 시나리오:
   * - 페이지 로드 시 인증 상태 확인
   * - 보호된 라우트에서 사용자 검증
   * - 사용자 정보가 필요한 API 호출 전
   */
  static async getCurrentUser() {
    // supabase 서버 클라이언트 생성
    const supabase = await createSSRClient();

    // 현재 세션의 사용자 정보 조회
    const {
      data: { user }, // 구조 분해 할당으로 user 추출
      error,
    } = await supabase.auth.getUser();

    // 사용자 정보 조회 오류 처리
    if (error) {
      throw new Error(error.message);
    }

    // 사용자 객체 반환(로그인 상태: User 객체, 비로그인 상태 null)
    return user;
  }
}
