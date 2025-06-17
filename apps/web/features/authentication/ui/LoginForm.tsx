'use client';

import { Input } from '@repo/ui/design-system/base-components/Input/index';

export interface LoginFormProps {
  email: string;
  password: string;
  error?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error = '',
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일 주소"
          required
          error={error.includes('이메일') ? error : undefined}
        />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
          error={error.includes('비밀번호') ? error : undefined}
        />
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            로그인 상태 유지
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">
          로그인
        </button>
        <p className="mt-4 text-center">
          <span className="text-gray-500">다른 계정으로 로그인:</span>
          {['구글', '애플', '페이스북'].map((platform) => (
            <button
              key={platform}
              type="button"
              className="ml-2 text-blue-500 hover:underline"
              onClick={() => {
                onChangeEmail({ target: { value: '' } } as any); // 간단한 초기화
                onChangePassword({ target: { value: '' } } as any);
              }}
            >
              {platform}
            </button>
          ))}
        </p>
      </form>
      <p className="mt-4 text-center">
        계정이 없으신가요?{' '}
        <a href="#" className="text-blue-500 hover:underline">
          회원가입
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
