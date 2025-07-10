import { UpdatePasswordForm } from '@/features/authentication/components/UpdatePasswordForm';
import { Suspense } from 'react';

function UpdatePasswordContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-tertiary)] p-[var(--spacing-4)]">
      <div className="w-full max-w-md space-y-[var(--spacing-4)] rounded-[var(--radius-lg)] bg-[var(--bg-primary)] p-[var(--spacing-8)] shadow-[var(--shadow-md)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">새 비밀번호 설정</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            새로운 비밀번호를 입력해주세요.
          </p>
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordContent />
    </Suspense>
  );
}
