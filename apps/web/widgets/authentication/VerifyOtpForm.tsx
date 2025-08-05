'use client';

import { AuthService } from '@/shared/api/server/authentication/authService';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState } from 'react';

function VerifyOtpFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      if (!otp.trim()) {
        setError('인증 코드를 입력해주세요.');
        setIsSubmitting(false);
        return;
      }

      try {
        await AuthService.verifyOtp(email, otp, 'signup');
        router.push('/signup/complete');
      } catch (err) {
        setError(err instanceof Error ? err.message : '잘못된 인증 코드입니다.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, otp, router]
  );

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1 className="mb-4 mt-4 text-2xl">이메일 인증</h1>
      <p>{email} </p>
      <p className="mb-4"> 전송된 6자리 코드를 입력해주세요.</p>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="인증 코드 6자리"
          maxLength={6}
          required
        />
        <Button variants="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '인증 중...' : '인증하고 계속하기'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export function VerifyOtpForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpFormComponent />
    </Suspense>
  );
}
