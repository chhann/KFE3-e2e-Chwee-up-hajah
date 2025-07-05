import { buttonStyle } from './Button.styles';

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
  const combinedClassName =
    variants === 'custom'
      ? `${className} ${buttonStyle.buttonSizeClasses[size]} ${buttonStyle.buttonDisabledClasses}`
      : `${buttonStyle.buttonVariantClasses[variants]} ${buttonStyle.buttonSizeClasses[size]} ${buttonStyle.buttonDisabledClasses} ${className} cursor-pointer`;

  return (
    <button type={type} className={combinedClassName} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
