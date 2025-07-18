'use client';

import { useLogin } from '@/shared/hooks/useLogin';
import { LoginFormComponent } from '@/widgets/authentication/LoginFormComponent';

const LoginPage = () => {
  // 1. 데이터와 상태, 핸들러는 모두 useLogin 훅에서 가져옵니다.
  const { email, password, error, isPending, onSubmit, onChangeEmail, onChangePassword } =
    useLogin();

  // 2. Enter 키 입력을 위한 useEffect는 더 이상 필요 없으므로 삭제합니다.
  //    (LoginFormComponent 내부의 <form>과 type="submit" 버튼이 자동으로 처리합니다.)

  return (
    // 3. 페이지는 전체 레이아웃만 담당합니다. (예: 화면 중앙 정렬)
    <div className="bg-background-light flex min-h-screen w-full flex-col items-center pt-20">
      {/* 4. UI 렌더링은 LoginFormComponent에 모두 위임하고, 필요한 모든 props를 넘겨줍니다. */}
      <LoginFormComponent
        email={email}
        password={password}
        error={error}
        isPending={isPending}
        onSubmit={onSubmit}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
      />
    </div>
  );
};

export default LoginPage;
