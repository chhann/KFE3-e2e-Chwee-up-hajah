import React from 'react';
import { cn } from '../../../utils/cn'; // 경로는 실제 프로젝트 구조에 맞게 조정하세요.

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variants: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

const buttonStyle = {
  buttonSizeClasses: {
    lg: 'text-base w-full py-3 px-6',
    md: 'text-sm px-4 py-2',
    sm: 'text-xs px-3 py-1.5',
  },
  buttonDisabledClasses: cn(
    'disabled:bg-primary-100 disabled:text-primary-300 disabled:cursor-not-allowed',
    'disabled:hover:bg-primary-100'
  ),
};

export const Button = ({
  children,
  variants,
  type = 'button',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  style,
}: ButtonProps) => {
  // variants는 이제 custom만 사용하므로 로직을 단순화합니다.
  const combinedClassName = cn(
    buttonStyle.buttonSizeClasses[size],
    buttonStyle.buttonDisabledClasses,
    'rounded-md font-medium transition-colors duration-200',
    className
  );

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
