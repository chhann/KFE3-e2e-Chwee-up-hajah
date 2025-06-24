export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variants: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'lg' | 'thinLg' | 'md' | 'thinMd' | 'sm';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  children,
  variants,
  type = 'button',
  size = 'sm',
  className = '',
  disabled = false,
  onClick,
}: ButtonProps) => {
  const variantClasses = {
    primary:
      'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-bg-hover)] active:bg-[var(--button-primary-bg-active)] font-medium rounded-lg transition-colors duration-150',
    secondary:
      'bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] hover:bg-[var(--button-secondary-bg-hover)] active:bg-[var(--button-secondary-bg-active)] font-medium rounded-lg transition-colors duration-150',
    outline:
      'bg-[var(--button-outline-bg)] text-[var(--button-outline-text)] border border-[var(--button-outline-border)] hover:bg-[var(--button-outline-bg-hover)] font-medium rounded-lg transition-colors duration-150',
    ghost:
      'bg-[var(--button-ghost-bg)] text-[var(--button-ghost-text)] hover:bg-[var(--button-ghost-bg-hover)] font-medium rounded-lg transition-colors duration-150',
  };

  const sizeClasses = {
    lg: 'text-base w-full py-5 px-6',
    thinLg: 'text-base w-full py-2 px-6',
    md: 'text-sm px-8 py-3',
    thinMd: 'text-sm px-8 py-2',
    sm: 'text-xs px-4 py-2',
  };

  const disabledClasses =
    'disabled:bg-[var(--button-disabled-bg)] disabled:text-[var(--button-disabled-text)] disabled:cursor-not-allowed disabled:opacity-60';

  const combinedClassName =
    variants === 'custom'
      ? `${className} ${sizeClasses[size]} ${disabledClasses}`
      : `${variantClasses[variants]} ${sizeClasses[size]} ${disabledClasses} ${className} cursor-pointer`;

  return (
    <button type={type} className={combinedClassName} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
