// app/login/page.tsx (또는 클라이언트 페이지)
'use client';

import LoginForm from '../../../features/authentication/ui/LoginForm';
import { useLogin } from '../../../hooks/useLogin';
import { useAuthStore } from '../../../stores/auth';

export default function LoginPage() {
  const { email, password, error, onChangeEmail, onChangePassword, onSubmit } = useLogin();

  // 상태를 콘솔로 출력하는 함수
  const handleTest = () => {
    const state = useAuthStore.getState();
    console.log('useAuthStore state:', state);
  };

  return (
    <div>
      <LoginForm
        email={email}
        password={password}
        error={error}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSubmit={onSubmit}
      />

      {/* 상태 출력용 버튼 */}
      <button
        onClick={handleTest}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        상태 테스트
      </button>
    </div>
  );
}
