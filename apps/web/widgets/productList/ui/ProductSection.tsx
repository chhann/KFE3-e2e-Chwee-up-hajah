'use client';

import { ProductList } from '../../../features/product-list/ui/ProductList';
import type { Product } from '../types';

interface ProductSectionProps {
  products?: Product[];
  isLoading: boolean;
  direction: 'horizontal' | 'vertical';
  className?: string;
}

export const ProductSection = ({
  products,
  isLoading,
  direction,
  className = '',
}: ProductSectionProps) => {
  if (isLoading || !products) {
    return <div className={`text-sm text-gray-500 ${className}`}>로딩 중...</div>;
  }

  return (
    <div className={className}>
      <ProductList items={products} direction={direction} />
    </div>
  );
};
