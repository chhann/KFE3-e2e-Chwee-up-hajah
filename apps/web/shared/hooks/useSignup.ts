import { AuthService } from '@/shared/api/server/authentication/authService';
import type { UseSignupReturn, ValidationErrors } from '@/shared/types/auth/types';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

/**
 * 중복 확인 상태 타입
 * '': 초기 상태
 * 'checking': 확인 중
 * 'success': 성공
 * 'error': 실패
 */
type CheckStatus = '' | 'checking' | 'success' | 'error';

/**
 * 오류 객체에서 메시지를 안전하게 추출하는 유틸리티 함수
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error && 'message' in error) return String(error.message);
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 회원가입 폼 관리를 위한 커스텀 훅
 *
 * 주요 기능:
 * - 폼 상태 관리 (입력값, 오류, 로딩 상태)
 * - 이메일/사용자명 중복 확인
 * - 폼 유효성 검사
 * - 회원가입 처리
 *
 * @returns 회원가입 완료
 */
export const useSignup = (): UseSignupReturn => {
  const router = useRouter();

  // 폼 입력 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [agreedToTermsOfService, setAgreedToTermsOfService] = useState(false);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);

  // 오류 상태
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [formError, setFormError] = useState('');

  // 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // 중복 확인 상태
  const [emailCheckStatus, setEmailCheckStatus] = useState<CheckStatus>('');
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<CheckStatus>('');

  // -------------------
  // 오류 관리 함수들
  // -------------------

  /**
   * 모든 오류 메시지를 초기화
   */
  const resetErrors = useCallback(() => {
    setFormError('');
    setFieldErrors({});
  }, []);

  /**
   * 특정 필드의 오류 메시지를 제거
   */
  const clearFieldError = useCallback((field: keyof ValidationErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  /**
   * 여러 필드의 오류 메시지를 제거
   */
  const clearSpecificFieldErrors = useCallback((fields: (keyof ValidationErrors)[]) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      fields.forEach((field) => delete newErrors[field]);
      return newErrors;
    });
    setFormError('');
  }, []);

  // -------------------
  // 입력 변경 핸들러들
  // -------------------

  /**
   * 이메일 입력 변경 핸들러
   * 입력값 변경 시 중복 확인 상태와 오류 메시지 초기화
   */
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailCheckStatus('');
      clearFieldError('email');
    },
    [clearFieldError]
  );

  /**
   * 비밀번호 입력 변경 핸들러
   */
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      clearFieldError('password');
    },
    [clearFieldError]
  );

  /**
   * 비밀번호 확인 입력 변경 핸들러
   */
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
      clearFieldError('confirmPassword');
    },
    [clearFieldError]
  );

  /**
   * 사용자명 입력 변경 핸들러
   * 입력값 변경 시 중복 확인 상태와 오류 메시지 초기화
   */
  const onChangeUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setUsernameCheckStatus(''); // 중복 확인 상태 초기화
      clearFieldError('username');
    },
    [clearFieldError]
  );

  /**
   * 주소 입력 변경 핸들러
   */
  const onChangeAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
      clearFieldError('address');
    },
    [clearFieldError]
  );

  const onChangeAddressDetail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  }, []);

  const onChangeAgreedToTermsOfService = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTermsOfService(e.target.checked);
  }, []);

  const onChangeAgreedToPrivacyPolicy = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToPrivacyPolicy(e.target.checked);
  }, []);

  const onChangeAgreedToMarketing = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToMarketing(e.target.checked);
  }, []);

  // -------------------
  // 중복 확인 로직
  // -------------------

  /**
   * 이메일 중복 확인 처리
   * @returns 중복 확인 성공 여부
   */
  const onEmailDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['email']);
    setIsCheckingEmail(true);
    setEmailCheckStatus('checking');

    try {
      await AuthService.checkEmailDuplicate(email);
      setEmailCheckStatus('success');
      return true;
    } catch (error) {
      setFieldErrors((prev) => ({ ...prev, email: getErrorMessage(error) }));
      setEmailCheckStatus('error');
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  }, [email, clearSpecificFieldErrors]);

  /**
   * 사용자명 중복 확인 처리
   * @returns 중복 확인 성공 여부
   */
  const onUsernameDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['username']);
    setIsCheckingUsername(true);
    setUsernameCheckStatus('checking');

    try {
      await AuthService.checkUsernameDuplicate(username);
      setUsernameCheckStatus('success');
      return true;
    } catch (error) {
      setFieldErrors((prev) => ({ ...prev, username: getErrorMessage(error) }));
      setUsernameCheckStatus('error');
      return false;
    } finally {
      setIsCheckingUsername(false);
    }
  }, [username, clearSpecificFieldErrors]);

  // -------------------
  // 회원가입 처리
  // -------------------

  /**
   * 회원가입 폼 제출 처리
   *
   * 처리 순서:
   *  1. 중복 확인 완료 여부 검사
   *  2. 폼 데이터 유효성 검사
   *  3. 회원가입 API 호출
   *  4. 성공 시 적절한 페이지로 이동
   */
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (isSubmitting) return; // 이중 제출 방지
      resetErrors();
      setIsSubmitting(true);

      try {
        // 1. 중복 확인 완료 여부 검사
        const emailChecked = emailCheckStatus === 'success';
        const usernameChecked = usernameCheckStatus === 'success';

        if (!emailChecked || !usernameChecked) {
          const newFieldErrors: ValidationErrors = {};
          if (!emailChecked) newFieldErrors.email = '이메일 중복 확인을 해주세요.';
          if (!usernameChecked) newFieldErrors.username = '닉네임 중복 확인을 해주세요.';
          setFieldErrors(newFieldErrors);
          setFormError('중복 확인이 필요합니다.');
          return;
        }

        // 2. 폼 데이터 유효성 검사
        const validationErrors = AuthService.validateSignupData({
          email,
          password,
          confirmPassword,
          username,
          address,
          addressDetail,
          agreedToTermsOfService,
          agreedToPrivacyPolicy,
          agreedToMarketing,
        });

        if (Object.keys(validationErrors).length > 0) {
          setFieldErrors(validationErrors);
          setFormError('필수 항목을 모두 입력해주세요.');
          return;
        }

        // 3. 회원가입 API 호출
        const signupData = {
          email,
          password,
          username,
          address,
          addressDetail,
          agreedToTermsOfService,
          agreedToPrivacyPolicy,
          agreedToMarketing,
        };

        // 인증 코드를 입력하는 페이지로 리디렉션
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } catch (error) {
        // 오류 처리: 오류 메시지에 따라 적절한 필드에 표시
        const message = getErrorMessage(error);
        if (message.includes('이메일')) {
          setFieldErrors((prev) => ({ ...prev, email: message }));
        } else if (message.includes('닉네임')) {
          setFieldErrors((prev) => ({ ...prev, username: message }));
        } else {
          setFormError(message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      email,
      password,
      confirmPassword,
      username,
      address,
      addressDetail,
      emailCheckStatus,
      usernameCheckStatus,
      resetErrors,
      router,
      isSubmitting,
      agreedToTermsOfService,
    ]
  );

  // -------------------
  // 훅 반환값
  // -------------------
  return {
    // 폼 상태
    email,
    password,
    confirmPassword,
    username,
    address,
    addressDetail,
    agreedToTermsOfService,
    agreedToPrivacyPolicy,
    agreedToMarketing,

    // 오류 상태
    fieldErrors,
    formError,

    // 로딩 상태
    isSubmitting,
    isCheckingEmail,
    isCheckingUsername,

    // 중복 확인 상태
    emailCheckStatus,
    usernameCheckStatus,

    // 폼 입력 핸들러
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeUsername,
    onChangeAddress,
    onChangeAddressDetail,
    onChangeAgreedToTermsOfService,
    onChangeAgreedToPrivacyPolicy,
    onChangeAgreedToMarketing,

    // 액션 핸들러
    onSubmit,
    onEmailDuplicateCheck,
    onUsernameDuplicateCheck,

    // 유틸리티
    resetErrors,
  };
};
