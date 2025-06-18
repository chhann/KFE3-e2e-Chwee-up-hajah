import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';

// SignupForm.tsx
type SignupFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  formError: string;
  fieldErrors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
    address?: string;
  };
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDuplicateCheck: (field: 'email' | 'nickname' | 'address') => void;
};

const SignupForm = ({
  email,
  password,
  confirmPassword,
  nickname,
  address,
  formError,
  fieldErrors,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeNickname,
  onChangeAddress,
  onChangeAddressDetail,
  onSubmit,
  onDuplicateCheck,
}: SignupFormProps) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-4">회원가입</h2>
      <form onSubmit={onSubmit} className="whitespace-nowrap space-y-4">
        {/* 이메일 입력 및 중복 확인 */}
        <span className="text-sm text-gray-500">이메일 주소</span>
        <div className="flex items-center space-x-2">
          <Input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder=""
            error={fieldErrors.email}
          />
          <Button
            children="중복 확인"
            className=""
            variants="primary"
            size="md"
            disabled={!email}
          />
        </div>
      </form>

      {/* 비밀번호 입력 필드 */}
      <span className="text-sm text-gray-500">비밀번호</span>
      <Input
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        required
        error={fieldErrors.password ? fieldErrors.password : undefined}
      />

      <span className="text-sm text-gray-500">비밀번호 확인</span>
      <Input
        type="password"
        value={confirmPassword}
        onChange={onChangePasswordConfirm}
        placeholder="비밀번호 확인"
        required
        error={fieldErrors.confirmPassword ? fieldErrors.confirmPassword : undefined}
      />

      {/* 에러 메시지 표시 */}
      {fieldErrors.password && <p className="text-red-500 mt-2">{fieldErrors.password}</p>}

      {/* 닉네임 입력 및 중복 확인 */}
      <span className="text-sm text-gray-500">닉네임</span>
      <form className="mt-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            placeholder="닉네임"
            required
            error={fieldErrors.nickname ? fieldErrors.nickname : undefined}
          />
          <Button
            children="중복 확인"
            className="whitespace-nowrap"
            variants="primary"
            size="md"
            disabled={!nickname}
          />
        </div>
      </form>

      {/* 주소 입력 및 중복 확인 */}
      <form className="mt-4 space-y-2">
        {/* 레이블 */}
        <span className="text-sm text-gray-500">주소</span>

        {/* 주소 입력 + 검색 버튼 */}
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={nickname}
            onChange={onChangeAddress}
            placeholder=""
            required
            error={fieldErrors.address ? fieldErrors.address : undefined}
          />
          <Button children="검색" className="whitespace-nowrap" variants="primary" size="md" />
        </div>

        {/* 상세 주소 입력 */}
        <Input
          type="text"
          value={nickname}
          onChange={onChangeAddressDetail}
          placeholder="상세 주소"
          required
          error={fieldErrors.address ? fieldErrors.address : undefined}
        />
      </form>

      {/* 에러 메시지 */}
      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      {/* 회원가입 버튼 */}
      <form onSubmit={onSubmit} className="mt-4">
        <Button
          children="회원가입"
          className="w-full"
          variants="primary"
          size="md"
          disabled={!email || !nickname || !address}
        ></Button>
      </form>

      <p className="mt-12 text-center">
        계정이 있으신가요?{' '}
        <Link href="/signup" className="text-gray-500 hover:underline">
          로그인
        </Link>
      </p>
      <div className="mt-12 text-center text-gray-500"></div>
    </div>
  );
};

export default SignupForm;
