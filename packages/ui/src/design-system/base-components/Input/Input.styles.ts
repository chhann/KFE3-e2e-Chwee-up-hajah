// packages/ui/src/design-system/base-components/Input/Input.styles.ts

import { cn } from '../../../utils/cn';

export const inputStyle = {
  // Input Label
  inputLabelStyle: cn('mb-2 block text-sm font-medium text-gray-700'), // 좀 더 부드러운 색상으로 변경
  inputRequiredLabelStyle: cn('ml-0.5 text-red-500'),

  // Input Outline Container
  inputOutlineStyle: cn(
    'relative flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5', // ✅ 기본 스타일 변경: 부드러운 배경과 테두리
    'transition-all duration-150',
    'focus-within:ring-2 focus-within:ring-purple-400/30' // ✅ 포커스 시 보라색 ring 효과 추가
  ),
  inputOutlineErrorStyle: cn('!border-red-500 !ring-red-500/30'), // 에러 시 ring 효과 추가
  inputOutlineDisabledStyle: cn('cursor-not-allowed bg-gray-200 text-gray-500'),
  inputOutlineSuccessStyle: cn('!border-green-500 !ring-green-500/30'), // 성공 시 ring 효과 추가

  // Input Element
  inputBasickStyle: cn(
    'w-full flex-1 bg-transparent text-base text-gray-900 placeholder-gray-400', // 텍스트, placeholder 색상 변경
    'focus:outline-none'
  ),

  // Icons
  inputIconStyle: cn('h-5 w-5 text-gray-400'), // 아이콘 색상 변경

  // Password Toggle Button
  inputButtonStyle: cn(
    'ml-2 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200',
    'focus:outline-none focus:ring-2 focus:ring-purple-400/50'
  ),

  // Helper Messages
  messageBaseStyle: cn('mt-1.5 text-sm'),
  errorMessageStyle: cn('text-red-600'),
  successMessageStyle: cn('text-green-600'),
};
