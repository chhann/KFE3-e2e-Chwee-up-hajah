'use client';

import { useState } from 'react';
import LoginForm from '../features/authentication/ui/LoginForm';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // 비밀번호 확인 로직
    // 실제로는 사용자 입력으로 받아야 함
    if (password !== 'admin123' && password !== 'user123') {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 관리자 계정 예시
    // 실제로는 서버에서 관리자 인증을 처리해야 합니다.
    if (email === 'admin@example.com' && password === 'admin123') {
      window.location.href = '/admin/dashboard';
      return;
    }

    // 사용자 계정 예시
    // 실제로는 서버에서 사용자 인증을 처리해야 합니다.
    if (email === 'user@example.com' && password === 'user123') {
      window.location.href = '/user/dashboard';
      return;
    }

    // 성공 로직
    setError('');
    console.log(`Login successful: ${email}`);
    window.location.href = '/dashboard';
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <LoginForm
        email={email}
        password={password}
        error={error}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
      />
    </main>
  );
};

export default LoginPage;
