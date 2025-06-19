'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase/supabase';

const SignupCompletePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const completeSignup = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace('/login');
        return;
      }

      // 여기서 추가 프로필 정보를 입력받거나
      // 바로 대시보드로 리다이렉션
      router.replace('/dashboard');
    };

    completeSignup();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>회원가입을 완료하는 중입니다...</div>
      </div>
    );
  }

  return null;
};

export default SignupCompletePage;
