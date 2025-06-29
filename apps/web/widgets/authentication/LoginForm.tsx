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
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mt mb-4 text-center text-2xl font-bold">로그인</h2>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <span className="mt-6"></span>
        {/* 이메일 입력 필드 */}
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일 주소"
          required
          leftIcon="email"
        />

        {/* 비밀번호 입력 필드 */}
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
          leftIcon="password"
        />
        {/* 에러 메시지 표시 */}
        {error && <p className="mt-2 text-red-500">{error}</p>}

        {/* 비밀번호 찾기 링크 */}
        <div className="justify-between text-center text-sm text-gray-500">
          <Link href="/reset_password" className="text-gray-500 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <Button
          children="로그인"
          className="w-full"
          type="submit"
          variants="primary"
          size="md"
          disabled={!email || !password}
        />
      </form>

      {/* 소셜 로그인 버튼들 */}
      <div className="mt-4 text-center">
        <div className="text-center text-gray-500">다른 계정으로 로그인</div>
        <div className="mt-4 flex items-center justify-center space-x-3">
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
              src={`/images/avatar.png`} // 예시 이미지 경로
              style={{ marginLeft: '8px', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>

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
