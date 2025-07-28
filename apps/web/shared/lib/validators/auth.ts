// lib/validators/auth.ts
import { z } from 'zod';

/**
 * 회원가입 입력값 검증 스키마
 * - 각 필드의 유효성 조건을 정의하며,
 * - password와 confirmPassword의 일치 여부도 검사함
 */
const SignupBaseSchema = z.object({
  /** 이메일 주소 - 올바른 이메일 형식이어야 함 */
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),

  /** 비밀번호 - 최소 8자 이상 */
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하입니다.'),

  /** 비밀번호 확인 - password와 일치해야 함 (아래 refine에서 비교) */
  confirmPassword: z.string(),

  /** 사용자명/닉네임 - 최소 2자 이상 */
  username: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(16, '닉네임은 최대 16자 이하입니다.'),

  /** 주소 - 공백일 수 없음 */
  address: z.string().min(1, '주소를 입력해주세요.'),

  /** 상세 주소 - 선택 사항 */
  addressDetail: z.string().optional(),

  /** 이용 약관 동의 - 항상 true여야 함 */
  agreedToTermsOfService: z.literal(true, {
    message: '이용 약관 동의는 필수입니다.',
  }),

  /** 개인정보 수집 및 이용 동의 - 항상 true여야 함 */
  agreedToPrivacyPolicy: z.literal(true, {
    message: '개인정보 수집 및 이용 동의는 필수입니다.',
  }),

  /** 마케팅 정보 수신 동의 - 선택 사항 */
  agreedToMarketing: z.boolean().optional(),
});

export const SignupSchema = SignupBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  }
);

// 먼저 omit으로 서버 스키마 생성
export const SignupServerSchema = SignupBaseSchema.omit({ confirmPassword: true });

// 그 다음 클라이언트 스키마에 refine 추가
export const SignupClientSchema = SignupSchema;

/**
 * 회원가입 입력값 타입
 * - SignupSchema로부터 자동 추론
 * - 폼 처리 로직에서 사용됨
 */
export type SignupServerInput = z.infer<typeof SignupServerSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
