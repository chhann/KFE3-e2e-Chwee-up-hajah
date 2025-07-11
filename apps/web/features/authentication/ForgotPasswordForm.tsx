'use client';

import { createClient } from '@/app/client';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { useState } from 'react';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // 1. 클라이언트용 Supabase 인스턴스 생성
    const supabase = createClient();

    // 2. resetPasswordForEmail 직접 호출
    const { error: submissionError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/password-update`,
    });

    setLoading(false);

    if (submissionError) {
      setError(`오류가 발생했습니다: ${submissionError.message}`);
    } else {
      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="이메일"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <Button variants="primary" type="submit" className="w-full" disabled={loading}>
        {loading ? '전송 중...' : '재설정 링크 보내기'}
      </Button>
      {message && <p className="mt-2 text-sm text-[var(--text-success)]">{message}</p>}
      {error && <p className="mt-2 text-sm text-[var(--text-error)]">{error}</p>}
    </form>
  );
}
