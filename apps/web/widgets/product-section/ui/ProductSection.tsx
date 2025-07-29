'use client';

import { LoadingSpinner } from '@/widgets/loading-spiner';

import { ProductList } from '../../../features/product-list/ui/ProductList';
import { Styles as ProductSectionStyles } from '../styles/product-section.styles';
import type { Product } from '../types';

interface ProductSectionProps {
  products?: Product[];
  isLoading: boolean;
  className?: string;
}

export const ProductSection = ({ products, isLoading, className = '' }: ProductSectionProps) => {
  if (isLoading || !products) {
    return (
      <div className={`${ProductSectionStyles.loading(className)} h-[211px]`}>
        <LoadingSpinner />
      </div>
    );
  }

  return <ProductList items={products} />;
};
