import { cn } from '../../../utils/cn';
import { badgeStyle, variantClasses } from './Badge.styles';

export interface BadgeProps {
  children: React.ReactNode;
  variant: 'best' | 'urgent';
  className?: string;
}

const Badge = ({ children, variant, className = '', ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeStyle, variantClasses[variant], className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
