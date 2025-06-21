// stores/signupStore.ts
import { create } from 'zustand';
import { createClient } from '../lib/supabase/client';
import { SignupInput, SignupSchema } from '../lib/validators/auth';

/**
 * 회원가입 상태 및 액션을 정의하는 Zustand 스토어 인터페이스
 */
interface SignupState {
  // 회원가입 폼 상태
  form: {
    /** 이메일 입력값 */
    email: string;
    /** 비밀번호 입력값 */
    password: string;
    /** 비밀번호 확인 입력값 */
    confirmPassword: string;
    /** 닉네임/사용자명 입력값 */
    username: string;
    /** 주소 입력값 */
    address: string;
    /** 상세 주소 입력값 */
    addressDetail: string;
  };

  // 각 필드별 오류 메시지 (유효성 검사 실패 시)
  errors: Partial<Record<keyof SignupInput, string[]>>;

  // 전체 폼에 대한 에러 메시지
  formError: string | null;

  // 로딩 상태 (회원가입 처리 중)
  loading: boolean;

  // 회원가입 성공 여부
  success: boolean;

  // 액션 메시지 정의

  /** 폼 전체를 업데이트  */
  setForm: (form: Partial<SignupState['form']>) => void;

  /** 필드별 에러 메시지 설정 */
  setErrors: (errors: Partial<Record<keyof SignupInput, string[]>>) => void;

  /** 폼 전체 에러 메시지 설정 */
  setFormError: (error: string | null) => void;

  /** 로딩 상태 설정 */
  setLoading: (loading: boolean) => void;

  /** 회원가입 성공 상태 설정 */
  setSuccess: (success: boolean) => void;

  /** 특정 필드 값 업데이트 및 해당 필드 에러 초기화 */
  updateField: (key: keyof SignupInput, value: string) => void;

  /** 입력값 유효성 검사 */
  validate: () => boolean;

  /** 회원가입 처리 (Supabase API 호출 포함) */
  signUp: () => Promise<void>;

  /** 상태 초기화 */
  reset: () => void;
}

/** 초기 폼 값 정의 */
const initialForm = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  address: '',
  addressDetail: '',
};

/**
 * 회원가입 전용 Zustand 스토어 정의
 */
export const useSignupStore = create<SignupState>()((set, get) => ({
  // 초기 상태 설정
  form: initialForm,
  errors: {},
  formError: null,
  loading: false,
  success: false,

  /** 폼 전체 값 설정 (부분 업데이트 가능) */
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),

  /** 필드별 오류 설정 */
  setErrors: (errors) => set({ errors }),

  /** 폼 전체 오류 메시지 설정 */
  setFormError: (formError) => set({ formError }),

  /** 로딩 상태 설정 */
  setLoading: (loading) => set({ loading }),

  /** 성공 여부 설정 */
  setSuccess: (success) => set({ success }),

  /** 개별 필드 값 업데이트 및 해당 필드 에러 제거 */
  updateField: (key, value) => {
    set((state) => ({
      form: { ...state.form, [key]: value },
      errors: { ...state.errors, [key]: undefined }, // 해당 필드 에러 제거
      formError: null,
    }));
  },

  /** 폼 유효성 검사 실행 (Zod 기반) */
  validate: () => {
    const { form } = get();
    const result = SignupSchema.safeParse(form);

    if (!result.success) {
      // 유효성 검사 실패 시 에러 정보 저장
      const fieldErrors = result.error.flatten().fieldErrors;
      set({ errors: fieldErrors, formError: null });
      return false;
    }

    // 유효성 통과
    set({ errors: {}, formError: null });
    return true;
  },

  /** Supabase를 통한 회원가입 처리 */
  signUp: async () => {
    const { form, validate } = get();

    // 유효성 검사 실패 시 중단
    if (!validate()) return;

    set({ loading: true, formError: null, success: false });

    try {
      const supabase = createClient();

      // Supabase 회원가입 API 호출
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            username: form.username,
            address: form.address,
            address_detail: form.addressDetail,
          },
        },
      });

      // 에러 발생 시 처리
      if (error) {
        console.error('Signup error:', error);
        set({
          formError: error.message || '회원가입에 실패했습니다.',
          loading: false,
        });
        return;
      }

      // 회원가입 성공 처리
      set({
        success: true,
        loading: false,
        formError: null,
        form: initialForm, // 폼 초기화
        errors: {},
      });

      // 이메일 인증 필요 시 안내 메시지
      if (data.user && !data.session) {
        alert('가입 성공! 이메일을 확인하여 계정을 활성화해주세요.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      set({
        loading: false,
        formError: error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.',
      });
    }
  },

  /** 상태 초기화 */
  reset: () =>
    set({
      form: initialForm,
      errors: {},
      formError: null,
      loading: false,
      success: false,
    }),
}));
