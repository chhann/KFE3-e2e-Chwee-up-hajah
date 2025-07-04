export const ButtonVariantClasses = {
  primary:
    'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-bg-hover)] active:bg-[var(--button-primary-bg-active)] font-medium rounded-lg transition-colors duration-150',
  secondary:
    'bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] hover:bg-[var(--button-secondary-bg-hover)] active:bg-[var(--button-secondary-bg-active)] font-medium rounded-lg transition-colors duration-150',
  outline:
    'bg-[var(--button-outline-bg)] text-[var(--button-outline-text)] border border-[var(--button-outline-border)] hover:bg-[var(--button-outline-bg-hover)] font-medium rounded-lg transition-colors duration-150',
  ghost:
    'bg-[var(--button-ghost-bg)] text-[var(--button-ghost-text)] hover:bg-[var(--button-ghost-bg-hover)] font-medium rounded-lg transition-colors duration-150',
};

export const ButtonSizeClasses = {
  lg: 'text-base w-full py-5 px-6',
  thinLg: 'text-base w-full py-2 px-6',
  md: 'text-sm px-8 py-3',
  thinMd: 'text-sm px-8 py-2',
  sm: 'text-xs px-4 py-2',
};

export const ButtonDisabledClasses =
  'disabled:bg-[var(--button-disabled-bg)] disabled:text-[var(--button-disabled-text)] disabled:cursor-not-allowed disabled:opacity-60';
