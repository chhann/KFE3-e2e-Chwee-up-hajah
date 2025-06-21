// app/login/page.tsx (또는 클라이언트 페이지)
'use client';

import LoginForm from '../../../features/authentication/ui/LoginForm';
import { useLogin } from '../../../hooks/useLogin';

export default function LoginPage() {
  const { email, password, error, onChangeEmail, onChangePassword, onSubmit } = useLogin();

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
}
