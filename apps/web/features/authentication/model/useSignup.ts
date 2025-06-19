import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AuthService } from '../api/authService';
import type { UseSignupReturn, ValidationErrors } from './types';

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
  const [username, setusername] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const [formError, setFormError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingusername, setIsCheckingusername] = useState(false);

  const [emailChecked, setEmailChecked] = useState(false);
  const [usernameChecked, setusernameChecked] = useState(false);

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

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailChecked(false);
      clearFieldError('email');
    },
    [clearFieldError]
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      clearFieldError('password');
    },
    [clearFieldError]
  );

  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
      clearFieldError('confirmPassword');
    },
    [clearFieldError]
  );

  const onChangeusername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setusername(e.target.value);
      setusernameChecked(false);
      clearFieldError('username');
    },
    [clearFieldError]
  );

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

  const onEmailDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['email']);
    setIsCheckingEmail(true);

    try {
      await AuthService.checkEmailDuplicate(email);
      setEmailChecked(true);
      return true;
    } catch (error) {
      const message = getErrorMessage(error);
      setFieldErrors((prev) => ({ ...prev, email: message }));
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  }, [email, clearSpecificFieldErrors]);

  const onUsernameDuplicateCheck = useCallback(async (): Promise<boolean> => {
    clearSpecificFieldErrors(['username']);
    setIsCheckingusername(true);

    try {
      await AuthService.checkUsernameDuplicate(username);
      setusernameChecked(true);
      return true;
    } catch (error) {
      const message = getErrorMessage(error);
      setFieldErrors((prev) => ({ ...prev, username: message }));
      return false;
    } finally {
      setIsCheckingusername(false);
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

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (isSubmitting) return;
      resetErrors();
      setIsSubmitting(true);

      try {
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
          // 이메일 인증이 필요한 경우
          alert('가입 확인 이메일을 발송했습니다. 이메일을 확인 후 로그인해주세요.');
          router.push('/login');
        } else {
          // 바로 로그인된 경우
          router.push('/dashboard');
        }

        if (result.needsVerification) {
          // 이메일 인증이 필요한 경우
          alert('가입 확인 이메일을 발송했습니다. 이메일을 확인 후 로그인해주세요.');
          router.push('/login');
        } else {
          // 바로 로그인된 경우
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
      email,
      password,
      confirmPassword,
      username,
      address,
      addressDetail,
      emailChecked,
      usernameChecked,
      resetErrors,
      router,
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
    isCheckingusername,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeusername,
    onChangeAddress,
    onChangeAddressDetail,
    onSubmit,
    onEmailDuplicateCheck,
    onUsernameDuplicateCheck,
    onAddressSearch,
    resetErrors,
  };
};
