import { cn } from '@repo/ui/utils/cn';
import { itemBadgeStyle, itemContentStyle, itemStyle, itemTitleStyle } from './Item.styles';

interface Props {
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'div'>;
}

const Item = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={cn(itemStyle, className)} {...props}>
      {children}
    </div>
  );
};

const ItemBadge = ({ children, className = '', ...props }: Props) => {
  return (
    <div className={cn(itemBadgeStyle, className)} {...props}>
      {children}
    </div>
  );
};

const ItemTitle = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={cn(itemTitleStyle, className)} {...props}>
      {children}
    </div>
  );
};

const ItemContent = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={cn(itemContentStyle, className)} {...props}>
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

export { Item, ItemBadge, ItemContent, ItemFooter, ItemTitle };
