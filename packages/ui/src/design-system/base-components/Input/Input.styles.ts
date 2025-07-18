// packages/ui/src/design-system/base-components/Input/Input.styles.ts (새 파일)

import { cn } from '../../../utils/cn';

export const inputStyle = {
  // Input Label
  inputLabelStyle: cn('mb-1.5 block text-sm font-medium text-text-default'),
  inputRequiredLabelStyle: cn('ml-0.5 text-red-500'),

  // Input Outline Container
  inputOutlineStyle: cn(
    'relative flex items-center rounded-lg border border-primary-200 bg-background-light px-3 py-2',
    'transition-all duration-150',
    'focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30'
  ),
  inputOutlineErrorStyle: cn('!border-red-500 focus-within:!ring-red-500/30'),
  inputOutlineDisabledStyle: cn('cursor-not-allowed bg-primary-100'),

  // Input Element
  inputBasickStyle: cn(
    'w-full flex-1 bg-transparent text-base text-text-default placeholder-text-lighter',
    'focus:outline-none'
  ),

  // Icons
  inputIconStyle: cn('h-5 w-5 text-text-lighter'),

  // Password Toggle Button
  inputButtonStyle: cn(
    'ml-2 rounded-full p-1 text-text-lighter transition-colors hover:bg-primary-100',
    'focus:outline-none focus:ring-2 focus:ring-accent-500/50'
  ),

  // Helper Messages
  messageBaseStyle: cn('mt-1.5 text-sm'),
  errorMessageStyle: cn('text-red-600'),
  successMessageStyle: cn('text-green-600'),
};
