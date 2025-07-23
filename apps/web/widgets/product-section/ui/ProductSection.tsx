'use client';

import { ProductList } from '../../../features/product-list/ui/ProductList';
import type { Product } from '../types';
import { Styles } from '../styles/product-section.styles';

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
    return <div className={Styles.loading(className)}>로딩 중...</div>;
  }

  return <ProductList items={products} direction={direction} />;
};
