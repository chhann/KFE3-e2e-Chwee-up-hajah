import React from 'react';
import { cn } from '../../../utils/cn'; // 경로는 실제 프로젝트 구조에 맞게 조정하세요.

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variants?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'lg' | 'thinLg' | 'md' | 'thinMd' | 'sm';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

const buttonStyle = {
  buttonVariantClasses: {
    primary:
      'bg-primary-500 text-white transition-colors hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary:
      'bg-[var(--button-secondary-bg)] text-white hover:bg-[var(--button-secondary-bg-hover)] active:bg-[var(--button-secondary-bg-active)] ',
    outline:
      'bg-[var(--button-outline-bg)] text-[var(--button-outline-text)] border border-[var(--button-outline-border)] hover:bg-[var(--button-outline-bg-hover)] ',
    ghost:
      'bg-[var(--button-ghost-bg)] text-[var(--button-ghost-text)] hover:bg-[var(--button-ghost-bg-hover)]',
    custom: '',
  },
  buttonSizeClasses: {
    lg: 'text-base w-full py-3 px-6',
    thinLg: 'w-full text-sm px-4 py-2',
    md: 'text-sm px-4 py-2',
    thinMd: 'text-sm px-4 py-2',
    sm: 'text-xs px-3 py-1.5',
  },

  buttonDisabledClasses: cn(
    'disabled:bg-neutral-100 disabled:text-neutral-600 disabled:cursor-not-allowed',
    'disabled:hover:bg-netual-100'
  ),
};

export const Button = ({
  children,
  variants = 'custom',
  type = 'button',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  style,
}: ButtonProps) => {
  // variants는 이제 custom만 사용하므로 로직을 단순화합니다.
  const combinedClassName = cn(
    buttonStyle.buttonVariantClasses[variants],
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
