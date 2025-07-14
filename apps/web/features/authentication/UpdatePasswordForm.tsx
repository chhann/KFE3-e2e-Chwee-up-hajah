'use client';

import { createClient } from '@/app/client';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    const response = await fetch('/api/auth/password-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(`오류가 발생했습니다: ${data.error || '알 수 없는 오류'}`);
    } else {
      setMessage('비밀번호가 성공적으로 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="password"
        label="새 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={loading}
      />
      <Button variants="primary" type="submit" className="w-full" disabled={loading}>
        {loading ? '변경 중...' : '비밀번호 변경'}
      </Button>
      {message && <p className="mt-2 text-sm text-[var(--text-success)]">{message}</p>}
      {error && <p className="mt-2 text-sm text-[var(--text-error)]">{error}</p>}
    </form>
  );
}
