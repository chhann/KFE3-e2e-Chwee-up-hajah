import { cn } from '../../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant: 'best' | 'urgent';
  className?: string;
}

const Badge = ({ children, variant, className = '', ...props }: BadgeProps) => {
  const variantClasses = {
    best: 'bg-[var(--color-red-500)] text-white',
    urgent: 'bg-[var(--color-yellow-500)] text-white',
  };

  return (
    <span
      className={cn(
        'gap-1 inline-flex items-center justify-center shrink-0 overflow-hidden px-3 py-1 rounded-full text-sm',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
