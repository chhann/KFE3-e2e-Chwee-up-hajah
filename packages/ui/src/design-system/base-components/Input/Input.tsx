import { useId, useState } from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { cn } from '../../../utils/cn';
import {
  errorMessageStyle,
  inputButtonStyle,
  inputIconStyle,
  inputLabelStyle,
  inputOutlineDisabledStyle,
  inputOutlineErrorStyle,
  inputOutlineStyle,
  inputRequiredLabelStyle,
  inputStyle,
  messageBaseStyle,
} from './Input.styles';

export interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
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
  success,
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
      return <MdEmail className={inputIconStyle} />;
    }
    if (leftIcon === 'password') {
      return <MdLock className={inputIconStyle} />;
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* 라벨 */}
      {label && (
        <label htmlFor={inputId} className={inputLabelStyle}>
          {label}
          {required && <span className={inputRequiredLabelStyle}>*</span>}
        </label>
      )}

      {/* 입력 필드 컨테이너 */}
      <div className="relative">
        <div
          className={cn(
            inputOutlineStyle,
            error && inputOutlineErrorStyle,
            disabled && inputOutlineDisabledStyle
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
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={inputStyle}
            {...props}
          />

          {/* 비밀번호 보기/숨기기 버튼 */}
          {type === 'password' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className={inputButtonStyle}
              disabled={disabled}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <MdVisibilityOff className={inputIconStyle} />
              ) : (
                <MdVisibility className={inputIconStyle} />
              )}
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && <p className={cn(messageBaseStyle, errorMessageStyle)}>{error}</p>}

        {/* 성공 메시지 */}
        {success && <p className={cn(messageBaseStyle)}>{success}</p>}
      </div>
    </div>
  );
};
