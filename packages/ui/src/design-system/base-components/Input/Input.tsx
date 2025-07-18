import React, { forwardRef, useId, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // react-icons 설치 필요
import { cn } from '../../../utils/cn'; // 경로는 실제 프로젝트 구조에 맞게 조정하세요.

export interface InputProps {
  id?: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;

    const handleTogglePassword = () => setShowPassword(!showPassword);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            ref={ref}
            className={cn(
              'bg-primary-50 text-text-default placeholder-text-lighter w-full rounded-md border px-4 py-3 text-base transition-colors duration-200',
              // 포커스 색상을 파스텔 보라색 계열로 변경
              'focus:bg-background-light focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2',
              error ? 'border-red-500' : 'border-primary-200',
              disabled ? 'bg-primary-100 cursor-not-allowed' : ''
            )}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="text-text-light absolute inset-y-0 right-0 flex items-center pr-4"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <MdVisibilityOff className="h-5 w-5" />
              ) : (
                <MdVisibility className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
