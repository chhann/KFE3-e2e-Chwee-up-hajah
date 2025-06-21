// lib/validators/auth.ts
import { z } from 'zod';

/**
 * 회원가입 입력값 검증 스키마
 * - 각 필드의 유효성 조건을 정의하며,
 * - password와 confirmPassword의 일치 여부도 검사함
 */
export const SignupSchema = z
  .object({
    /** 이메일 주소 - 올바른 이메일 형식이어야 함 */
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),

    /** 비밀번호 - 최소 8자 이상 */
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),

    /** 비밀번호 확인 - password와 일치해야 함 (아래 refine에서 비교) */
    confirmPassword: z.string(),

    /** 사용자명/닉네임 - 최소 2자 이상 */
    username: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),

    /** 주소 - 공백일 수 없음 */
    address: z.string().min(1, '주소를 입력해주세요.'),

    /** 상세 주소 - 선택 사항 */
    addressDetail: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    /** password와 confirmPassword가 일치하지 않을 경우의 에러 메시지 */
    message: '비밀번호가 일치하지 않습니다.',
    /** 에러가 표시될 대상 필드 지정 */
    path: ['confirmPassword'],
  });

/**
 * 회원가입 입력값 타입
 * - SignupSchema로부터 자동 추론
 * - 폼 처리 로직에서 사용됨
 */
export type SignupInput = z.infer<typeof SignupSchema>;
