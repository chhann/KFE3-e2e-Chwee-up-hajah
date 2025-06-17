'use client';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';

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
      <h2 className="text-2xl text-center font-bold mb-4 ">로그인</h2>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        {/* 이메일 입력 필드 */}
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일 주소"
          required
          error={error.includes('이메일') ? error : undefined}
        />

        {/* 비밀번호 입력 필드 */}
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
          error={error.includes('비밀번호') ? error : undefined}
        />
        {/* 에러 메시지 표시 */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* 비밀번호 찾기 링크 */}
        <div className="justify-between text-sm text-gray-500 text-center">
          <Link href="/reset-password" className="text-gray-500 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <Button
          children="로그인"
          className="w-full"
          variants="primary"
          size="md"
          disabled={!email || !password}
        />
      </form>

      {/* 소셜 로그인 버튼들 */}
      <p className="mt-4 text-center">
        <div className="text-gray-500 text-center">다른 계정으로 로그인</div>
        <div className="flex justify-center items-center mt-4 space-x-3">
          {/* 구글, 애플, 페이스북 아이콘을 Avatar로 표시 */}
          {['구글', '애플', '페이스북'].map((platform) => (
            <Avatar
              key={platform}
              alt={platform}
              name={platform}
              size="sm"
              className="inline-block align-middle"
              onClick={() => {
                onChangeEmail({ target: { value: '' } } as any); // 간단한 초기화
                onChangePassword({ target: { value: '' } } as any);
              }}
              src={`/images/${platform.toLowerCase()}.png`} // 예시 이미지 경로
              style={{ marginLeft: '8px', cursor: 'pointer' }}
            />
          ))}
        </div>
      </p>

      <p className="mt-12 text-center">
        계정이 없으신가요?{' '}
        <Link href="/signup" className="text-gray-500 hover:underline">
          회원가입
        </Link>
      </p>
      <div className="mt-12 text-center text-gray-500"></div>
    </div>
  );
};

export default LoginForm;
