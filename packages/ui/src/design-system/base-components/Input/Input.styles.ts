// packages/ui/src/design-system/base-components/Input/Input.styles.ts

import { cn } from '../../../utils/cn';

export const inputStyle = {
  // Input Label - 디자인 시스템 토큰 사용
  inputLabelStyle: cn('mb-2 block text-sm font-medium', 'text-[var(--text-primary)]'),
  inputRequiredLabelStyle: cn('ml-0.5', 'text-[var(--text-error)]'),

  // Input Outline Container - 완전히 보더 제거하고 ring만 사용
  inputOutlineStyle: cn(
    'relative flex items-center rounded-lg px-3 py-2.5',
    'bg-[var(--form-bg)]', // 디자인 시스템 배경색
    'transition-all duration-150',
    'ring-1 ring-[var(--form-border)]', // 기본 얇은 ring
    'focus-within:ring-1 focus-within:ring-[var(--border-accent)]' // 포커스 시 두꺼운 accent ring
  ),
  inputOutlineErrorStyle: cn('!ring-1 !ring-[var(--border-error)]'),
  inputOutlineDisabledStyle: cn(
    'cursor-not-allowed',
    'bg-[var(--bg-disabled)]',
    'text-[var(--text-disabled)]',
    '!ring-1 !ring-[var(--border-disabled)]'
  ),
  inputOutlineSuccessStyle: cn('!ring-1 !ring-[var(--color-success-500)]'),

  // Input Element - input 요소 자체를 완전히 투명하게
  inputBasickStyle: cn(
    'w-full flex-1 text-base',
    'bg-transparent border-0 outline-0', // 배경, 보더, 아웃라인 제거
    'text-[var(--form-text)]',
    'placeholder:text-[var(--form-placeholder)]',
    'focus:outline-none focus:ring-0 focus:border-0 focus:bg-transparent', // 포커스 시에도 투명
    '[&::-webkit-inner-spin-button]:appearance-none', // 웹킷 기본 스타일 제거
    '[&::-webkit-outer-spin-button]:appearance-none',
    'appearance-none' // 모든 기본 appearance 제거
  ),

  // Icons
  inputIconStyle: cn('h-5 w-5', 'text-[var(--text-tertiary)]'),

  // Password Toggle Button
  inputButtonStyle: cn(
    'ml-2 rounded-full p-1 transition-colors',
    'text-[var(--text-tertiary)]',
    'hover:bg-[var(--bg-tertiary)]',
    'focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]/50'
  ),

  // Helper Messages
  messageBaseStyle: cn('mt-1.5 text-xs'),
  errorMessageStyle: cn('text-[var(--text-error)]'),
  successMessageStyle: cn('text-[var(--text-success)]'),
};
