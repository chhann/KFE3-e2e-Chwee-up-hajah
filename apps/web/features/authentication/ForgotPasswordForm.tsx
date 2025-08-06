'use client';

import { createClient } from '@/app/client';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1. 클라이언트용 Supabase 인스턴스 생성
    const supabase = createClient();

    // 2. resetPasswordForEmail 직접 호출
    const { error: submissionError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/password-update`,
    });

    setLoading(false);

    if (submissionError) {
      toast.error(`오류가 발생했습니다: ${submissionError.message}`);
    } else {
      toast.success('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          가입하신 이메일 주소를 입력하시면 비밀번호를
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          재설정할 수 있는 링크를 보내드립니다.
        </p>
      </div>
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
      </form>
    </div>
  );
}
