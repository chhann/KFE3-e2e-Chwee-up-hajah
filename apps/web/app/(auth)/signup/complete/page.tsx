'use client';

import { useAuthStore } from '@/shared/stores/auth';
import { LoadingSpinner } from '@/widgets/loading-spiner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SignupCompletePage() {
  const router = useRouter();

  useEffect(() => {
    const syncAndRedirect = async () => {
      // 서버의 세션 상태와 클라이언트 스토어를 동기화합니다.
      await useAuthStore.getState().restore();

      // 동기화가 완료된 후 메인 페이지로 자동 이동합니다.
      router.push('/main');
    };

    syncAndRedirect();
  }, [router]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '40px 0' }}>
      <h2>환영합니다!</h2>
      <p className="mb-12 mt-4">가입 절차가 완료되었습니다.</p>
      <p>잠시 후 메인 페이지로 이동합니다...</p>
      <LoadingSpinner />
    </div>
  );
}

export default SignupCompletePage;
