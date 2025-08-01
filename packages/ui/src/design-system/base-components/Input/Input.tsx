import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { forwardRef, useId, useState } from 'react';
import { cn } from '../../../utils/cn';
import { inputStyle } from './Input.styles';

export interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  leftIcon?: 'email' | 'password';
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  readOnly?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      success,
      leftIcon,
      disabled = false,
      required = false,
      readOnly = false,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = useId();

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = numericValue;
      }
      onChange?.(e);
    };

    const inputType =
      type === 'password' && showPassword ? 'text' : type === 'number' ? 'text' : type;

    const renderLeftIcon = () => {
      if (leftIcon === 'email') {
        return <Mail className={inputStyle.inputIconStyle} />;
      }
      if (leftIcon === 'password') {
        return <Lock className={inputStyle.inputIconStyle} />;
      }
      return null;
    };

    return (
      <div className="w-full">
        {/* 라벨 */}
        {label && (
          <label htmlFor={inputId} className={inputStyle.inputLabelStyle}>
            {label}
            {required && <span className={inputStyle.inputRequiredLabelStyle}>*</span>}
          </label>
        )}

        {/* 입력 필드 컨테이너 */}
        <div className="relative flex-grow">
          <div
            className={cn(
              inputStyle.inputOutlineStyle,
              error && inputStyle.inputOutlineErrorStyle,
              success && inputStyle.inputOutlineSuccessStyle,
              disabled && inputStyle.inputOutlineDisabledStyle
            )}
          >
            {/* 왼쪽 아이콘 */}
            {leftIcon && <div className="mr-3">{renderLeftIcon()}</div>}

            {/* 입력 필드 */}
            <input
              id={inputId}
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={handleChange} // 수정된 핸들러 사용
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              maxLength={maxLength}
              inputMode={type === 'number' ? 'numeric' : undefined} // 숫자 키패드 유도
              pattern={type === 'number' ? '[0-9]*' : undefined} // 모바일 브라우저 지원
              className={inputStyle.inputBasickStyle}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
              }}
              ref={ref}
              {...props}
            />

            {/* 비밀번호 보기/숨기기 버튼 */}
            {type === 'password' && (
              <button
                type="button"
                onClick={handleTogglePassword}
                className={inputStyle.inputButtonStyle}
                disabled={disabled}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? (
                  <Eye className={inputStyle.inputIconStyle} />
                ) : (
                  <EyeOff className={inputStyle.inputIconStyle} />
                )}
              </button>
            )}
          </div>

          {/* 에러 메시지 */}
          {error && (
            <p className={cn(inputStyle.messageBaseStyle, inputStyle.errorMessageStyle)}>{error}</p>
          )}

          {/* 성공 메시지 */}
          {success && (
            <p className={cn(inputStyle.messageBaseStyle, inputStyle.successMessageStyle)}>
              {success}
            </p>
          )}
        </div>
      </div>
    );
  }
);
