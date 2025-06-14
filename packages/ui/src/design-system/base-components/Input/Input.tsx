import { useState, useId } from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

export interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  leftIcon?: 'email' | 'password';
  disabled?: boolean;
  required?: boolean;
}

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
  disabled = false,
  required = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const renderLeftIcon = () => {
    if (leftIcon === 'email') {
      return <MdEmail className="w-5 h-5 text-[var(--color-neutral-60)]" />;
    }
    if (leftIcon === 'password') {
      return <MdLock className="w-5 h-5 text-[var(--color-neutral-60)]" />;
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* 라벨 */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-neutral-70)] mb-2"
        >
          {label}
          {required && <span className="text-[var(--color-red-500)] ml-1">*</span>}
        </label>
      )}

      {/* 입력 필드 컨테이너 */}
      <div className="relative">
        <div
          className={`
            flex items-center border rounded-lg px-3 py-2
            ${error ? 'text-[var(--color-red-500)]' : 'text-[var(--color-neutral-30)]'}
            ${disabled ? 'bg-[var(--color-neutral-20)]' : 'bg-[var(--color-neutral-0)]'}
            focus-within:ring-1
            ${error ? 'focus-within:ring-[var(--color-red-500)]' : 'focus-within:ring-[var(--color-primary-800)]'}
            ${error ? 'focus-within:text-[var(--color-red-500)]' : 'focus-within:text-[var(--color-primary-800)]'}
          `}
        >
          {/* 왼쪽 아이콘 */}
          {leftIcon && <div className="mr-3">{renderLeftIcon()}</div>}

          {/* 입력 필드 */}
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="flex-1 bg-transparent border-0 outline-none placeholder-[var(--color-neutral-80)] disabled:cursor-not-allowed"
            {...props}
          />

          {/* 비밀번호 보기/숨기기 버튼 */}
          {type === 'password' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="ml-3 text-[var(--color-neutral-60)] hover:text-[var(--color-neutral-80)]"
              disabled={disabled}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <MdVisibilityOff className="w-5 h-5" />
              ) : (
                <MdVisibility className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p role="alert" className="mt-1 text-sm text-[var(--color-red-500)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
