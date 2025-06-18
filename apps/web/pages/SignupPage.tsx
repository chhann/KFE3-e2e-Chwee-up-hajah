'use client';

import { useState } from 'react';
import SignupForm from '../features/authentication/ui/SignupForm';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    address: '',
  });

  const [formError, setFormError] = useState('');

  const resetErrors = () => {
    setFormError('');
    setFieldErrors({
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      address: '',
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFieldErrors((prev) => ({ ...prev, email: '' }));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, password: '' }));
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setFieldErrors((prev) => ({ ...prev, nickname: '' }));
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setFieldErrors((prev) => ({ ...prev, address: '' }));
  };

  const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();

    let hasError = false;
    const newFieldErrors = { ...fieldErrors };

    if (!email) {
      newFieldErrors.email = '이메일을 입력해주세요.';
      hasError = true;
    }
    if (!password) {
      newFieldErrors.password = '비밀번호를 입력해주세요.';
      hasError = true;
    }
    if (!confirmPassword) {
      newFieldErrors.confirmPassword = '비밀번호 확인이 필요합니다.';
      hasError = true;
    }
    if (!nickname) {
      newFieldErrors.nickname = '닉네임을 입력해주세요.';
      hasError = true;
    }
    if (!address) {
      newFieldErrors.address = '주소를 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      setFormError('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
      setFormError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: '올바른 이메일 형식을 입력해주세요.',
      }));
      setFormError('입력 형식을 확인해주세요.');
      return;
    }

    if (password.length < 8) {
      setFieldErrors((prev) => ({
        ...prev,
        password: '비밀번호는 8자 이상이어야 합니다.',
      }));
      setFormError('입력 형식을 확인해주세요.');
      return;
    }

    // TODO: Supabase 또는 Firebase 회원가입 API 호출
    console.log('회원가입 시도:', {
      email,
      password: '***',
      nickname,
      address,
      addressDetail,
    });
  };

  const handleDuplicateCheck = (field: 'email' | 'nickname' | 'address') => {
    resetErrors();

    const fieldValues = { email, nickname, address };
    const value = fieldValues[field];

    if (!value.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: `${field === 'email' ? '이메일' : field === 'nickname' ? '닉네임' : '주소'}을 입력해주세요.`,
      }));
      return;
    }

    console.log(`${field} 중복 확인:`, { [field]: value });

    // TODO: 실제 중복 확인 API
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <SignupForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        nickname={nickname}
        address={address}
        formError={formError}
        fieldErrors={fieldErrors}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        onChangeNickname={onChangeNickname}
        onChangeAddress={onChangeAddress}
        onChangeAddressDetail={onChangeAddressDetail}
        onSubmit={onSubmit}
        onDuplicateCheck={handleDuplicateCheck}
      />
    </main>
  );
};

export default SignupPage;
