import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AuthService } from '../api/authService';
import type { UseSignupReturn, ValidationErrors } from './types';

type CheckStatus = '' | 'success' | 'error';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error && 'message' in error) return String(error.message);
  return '알 수 없는 오류가 발생했습니다.';
};

export const useSignup = (): UseSignupReturn => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [formError, setFormError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const [emailCheckStatus, setEmailCheckStatus] = useState<CheckStatus>('');
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<CheckStatus>('');

  const resetErrors = useCallback(() => {
    setFormError('');
    setFieldErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof ValidationErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const clearSpecificFieldErrors = useCallback((fields: (keyof ValidationErrors)[]) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      fields.forEach((field) => delete newErrors[field]);
      return newErrors;
    });
    setFormError('');
  }, []);

  // -------------------
  // Input 핸들러
  // -------------------
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailCheckStatus('');
    clearFieldError('email');
  }, [clearFieldError]);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearFieldError('password');
  }, [clearFieldError]);

  const onChangePasswordConfirm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    clearFieldError('confirmPassword');
  }, [clearFieldError]);

  const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameCheckStatus('');
    clearFieldError('username');
  }, [clearFieldError]);

  const onChangeAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    clearFieldError('address');
  }, [clearFieldError]);

  const onChangeAddressDetail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  }, []);

  // -------------------
  // 중복 확인 로직
  // -------------------
  const onEmailDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['email']);
    setIsCheckingEmail(true);

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

  const onUsernameDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['username']);
    setIsCheckingUsername(true);

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

  const onAddressSearch = useCallback(() => {
    clearSpecificFieldErrors(['address']);
    if (!address.trim()) {
      setFieldErrors((prev) => ({ ...prev, address: '주소를 입력해주세요.' }));
      return;
    }
    console.log('주소 검색:', address);
  }, [address, clearSpecificFieldErrors]);

  // -------------------
  // 회원가입
  // -------------------
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (isSubmitting) return;
      resetErrors();
      setIsSubmitting(true);

      try {
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

        const validationErrors = AuthService.validateSignupData({
          email,
          password,
          confirmPassword,
          username,
          address,
          addressDetail,
        });

        if (Object.keys(validationErrors).length > 0) {
          setFieldErrors(validationErrors);
          setFormError('필수 항목을 모두 입력해주세요.');
          return;
        }

        const result = await AuthService.signup({
          email,
          password,
          username,
          address,
          addressDetail,
        });

        if (result.needsVerification) {
          alert('가입 확인 이메일을 발송했습니다. 이메일을 확인 후 로그인해주세요.');
          router.push('/login');
        } else {
          router.push('/dashboard');
        }

      } catch (error) {
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
      email, password, confirmPassword, username,
      address, addressDetail,
      emailCheckStatus, usernameCheckStatus,
      resetErrors, router, isSubmitting,
    ]
  );

  return {
    email,
    password,
    confirmPassword,
    username,
    address,
    addressDetail,
    fieldErrors,
    formError,
    isSubmitting,
    isCheckingEmail,
    isCheckingUsername,
    emailCheckStatus,
    usernameCheckStatus,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeUsername,
    onChangeAddress,
    onChangeAddressDetail,
    onSubmit,
    onEmailDuplicateCheck,
    onUsernameDuplicateCheck,
    onAddressSearch,
    resetErrors,
  };
};