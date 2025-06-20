import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import Link from 'next/link';

type SignupFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  address: string;
  addressDetail: string;
  formError: string;
  fieldErrors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
    address?: string;
  };
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEmailDuplicateCheck: () => Promise<boolean>;
  onUsernameDuplicateCheck: () => Promise<boolean>;
  onAddressSearch: () => void;
};

const SignupForm = ({
    email,
    password,
    confirmPassword,
    username,
    address,
    addressDetail,
    fieldErrors,
    formError,
    isSubmitting,
    isCheckingEmail,
    isCheckingUsername,
    emailCheckStatus,
    usernameCheckStatus,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeUsername,
    onChangeAddress,
    onChangeAddressDetail,
    onSubmit,
    onEmailDuplicateCheck,
    onUsernameDuplicateCheck,
    onAddressSearch,
    resetErrors,
}: SignupFormProps) => {
  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-bold">회원가입</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 이메일 입력 및 중복 확인 */}
        <div>
          <span className="text-sm text-gray-500">이메일 주소</span>
          <div className="mt-1 flex items-start space-x-2">
            <Input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="이메일"
              required
              error={fieldErrors.email}
              success={emailCheckStatus === 'success' ? '사용 가능한 이메일입니다.' : undefined}
            />
            <Button
              type="button" // 폼 제출 방지
              children="중복 확인"
              className="whitespace-nowrap"
              variants="primary"
              size="md"
              disabled={!email}
              onClick={onEmailDuplicateCheck}
            />
          </div>
        </div>

        {/* 비밀번호 입력 필드 */}
        <div>
          <span className="text-sm text-gray-500">비밀번호</span>
          <Input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            required
            error={fieldErrors.password}
          />
        </div>

        <div>
          <span className="text-sm text-gray-500">비밀번호 확인</span>
          <Input
            type="password"
            value={confirmPassword}
            onChange={onChangePasswordConfirm}
            placeholder="비밀번호 확인"
            required
            error={fieldErrors.confirmPassword}
          />
        </div>

        {/* 닉네임 입력 및 중복 확인 */}
        <div>
          <span className="text-sm text-gray-500">닉네임</span>
          <div className="flex items-start space-x-2">
            <Input
              type="text"
              value={username}
              onChange={onChangeUsername}
              placeholder="닉네임"
              required
              error={fieldErrors.username}
              success={usernameCheckStatus === 'success' ? '사용 가능한 닉네임입니다.' : undefined}
            />
            <Button
              type="button" // 폼 제출 방지
              children="중복 확인"
              className="whitespace-nowrap"
              variants="primary"
              size="md"
              disabled={!username}
              onClick={onUsernameDuplicateCheck}
            />
          </div>
        </div>

        {/* 주소 입력 및 검색 */}
        <div>
          <span className="text-sm text-gray-500">주소</span>
          <div className="flex items-start space-x-2">
            <Input
              type="text"
              value={address}
              onChange={onChangeAddress}
              placeholder=""
              required={false}
            />
            <Button
              type="button" // 폼 제출 방지
              children="검색"
              className="whitespace-nowrap"
              variants="primary"
              size="md"
              onClick={onAddressSearch}
            />
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-500">상세 주소</span>
          <Input
            type="text"
            value={addressDetail}
            onChange={onChangeAddressDetail}
            placeholder="상세 주소"
            required
          />
        </div>

        {/* 전체 폼 에러 메시지 */}
        {formError && <p className="text-center text-sm text-red-500">{formError}</p>}

        {/* 회원가입 버튼 */}
        <Button
          type="submit" // 명시적으로 submit 타입 지정
          children="회원가입"
          className="w-full"
          variants="primary"
          size="md"
          disabled={!email || !username || !address}
        />

        <p className="mt-12 text-center">
          계정이 있으신가요?{' '}
          <Link href="/login" className="text-gray-500 hover:underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
