import { ForgotPasswordForm } from '@/features/authentication/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-tertiary)] p-[var(--spacing-4)]">
      <div className="w-full max-w-md space-y-[var(--spacing-4)] rounded-[var(--radius-lg)] bg-[var(--bg-primary)] p-[var(--spacing-8)] shadow-[var(--shadow-md)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            가입하신 이메일 주소를 입력하시면, 비밀번호를 재설정할 수 있는 링크를 보내드립니다.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
