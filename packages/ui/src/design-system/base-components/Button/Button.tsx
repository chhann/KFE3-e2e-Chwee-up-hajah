export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variants: 'primary' | 'secondary' | 'transparent' | 'outline' | 'custom';
  size?: 'lg' | 'thinLg' | 'md' | 'thinMd' | 'sm';
}
const Button = ({
  children,
  variants,
  size = 'sm',
  className = '',
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantsClasses = {
    primary:
      'bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-200)] font-medium rounded-lg',
    secondary:
      'bg-[var(--color-primary-200)] text-white hover:bg-[var(--color-primary-500)] font-medium rounded-lg',
    transparent: 'bg-transparent text-[var(--color-disabled-text)] font-medium rounded-lg',
    outline: 'border border-[var(--color-primary-500)] font-medium rounded-xl',
  };
  const sizeClasses = {
    lg: 'text-base w-full py-5',
    thinLg: 'text-base w-full py-1',
    md: 'text-sm px-8 py-3',
    thinMd: 'text-sm px-8 py-1',
    sm: 'text-xs px-4 py-2',
  };
  const disabledClasses =
    'disabled:bg-[var(--color-disabled-text)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed';
  const combinedClassName =
    variants === 'custom'
      ? `${className} ${sizeClasses[size]} ${disabledClasses}`
      : `${variantsClasses[variants]} ${sizeClasses[size]} ${disabledClasses} ${className} cursor-pointer`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
