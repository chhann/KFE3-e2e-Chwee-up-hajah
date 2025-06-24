import { cn } from '@repo/ui/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'div'>;
}

const Item = ({ className = '', children, ...props }: Props) => {
  return (
    <div
      className={cn('w-full space-y-1 rounded-[6px] bg-transparent px-2 py-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const ItemBadge = ({ children, className = '', ...props }: Props) => {
  return (
    <div className={cn('flex items-center text-sm', className)} {...props}>
      {children}
    </div>
  );
};

const ItemTitle = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={cn('text-base font-bold', className)} {...props}>
      {children}
    </div>
  );
};

const ItemContent = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={cn('text-xs', className)} {...props}>
      {children}
    </div>
  );
};

const ItemFooter = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export { Item, ItemBadge, ItemTitle, ItemContent, ItemFooter };
