// apps/web/shared/types/auth/types.ts

/**
 * 로그인 요청 데이터 인터페이스
 */
export interface LoginRequest {
  /** 이메일 주소 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 회원가입 데이터 인터페이스
 */
export interface SignupData {
  /** 이메일 주소 */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 사용자명/닉네임 */
  username: string;
  /** 주소 */
  address: string;
  /** 상세 주소 (선택사항) */
  addressDetail?: string;
  /** 이용 약관 동의 여부 */
  agreedToTermsOfService: boolean;
  /** 개인정보 수집 및 이용 동의 여부 */
  agreedToPrivacyPolicy: boolean;
  /** 마케팅 정보 수신 동의 여부 */
  agreedToMarketing: boolean;
}

/**
 * 폼 유효성 검사 오류 메시지 인터페이스
 */
export interface ValidationErrors {
  /** 이메일 관련 오류 메시지 */
  email?: string;
  /** 비밀번호 관련 오류 메시지 */
  password?: string;
  /** 비밀번호 확인 관련 오류 메시지 */
  confirmPassword?: string;
  /** 사용자명 관련 오류 메시지 */
  username?: string;
  /** 주소 관련 오류 메시지 */
  address?: string;
}

/**
 * useSignup 훅의 반환 타입 정의
 */
export interface UseSignupReturn {
  // 폼 상태
  /** 이메일 입력값 */
  email: string;
  /** 비밀번호 입력값 */
  password: string;
  /** 비밀번호 확인 입력값 */
  confirmPassword: string;
  /** 사용자명 입력값 */
  username: string;
  /** 주소 입력값 */
  address: string;
  /** 상세 주소 입력값 */
  addressDetail: string;
  /** 이용 약관 동의 여부 */
  agreedToTermsOfService: boolean;
  /** 개인정보 수집 및 이용 동의 여부 */
  agreedToPrivacyPolicy: boolean;
  /** 마케팅 정보 수신 동의 여부 */
  agreedToMarketing: boolean;

  // 오류 상태
  /** 각 필드별 오류 메시지 */
  fieldErrors: ValidationErrors;
  /** 전체 폼 오류 메시지 */
  formError: string;

  // 로딩 상태
  /** 회원가입 진행 중 여부 */
  isSubmitting: boolean;
  /** 이메일 중복 확인 중 여부 */
  isCheckingEmail: boolean;
  /** 사용자명 중복 확인 중 여부 */
  isCheckingUsername: boolean;

  // 중복 확인 상태
  /** 이메일 중복 확인 상태 */
  emailCheckStatus: '' | 'checking' | 'success' | 'error';
  /** 사용자명 중복 확인 상태 */
  usernameCheckStatus: '' | 'checking' | 'success' | 'error';

  // 폼 입력 핸들러
  /** 이메일 입력 변경 핸들러 */
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 비밀번호 입력 변경 핸들러 */
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 비밀번호 확인 입력 변경 핸들러 */
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 사용자명 입력 변경 핸들러 */
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 주소 입력 변경 핸들러 */
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 상세 주소 입력 변경 핸들러 */
  onChangeAddressDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 이용 약관 동의 변경 핸들러 */
  onChangeAgreedToTermsOfService: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 개인정보 수집 및 이용 동의 변경 핸들러 */
  onChangeAgreedToPrivacyPolicy: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 마케팅 정보 수신 동의 변경 핸들러 */
  onChangeAgreedToMarketing: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // 액션 핸들러
  /** 회원가입 폼 제출 핸들러 */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  /** 이메일 중복 확인 핸들러 */
  onEmailDuplicateCheck: () => Promise<boolean>;
  /** 사용자명 중복 확인 핸들러 */
  onUsernameDuplicateCheck: () => Promise<boolean>;

  // 유틸리티
  /** 모든 오류 메시지 초기화 */
  resetErrors: () => void;
}
