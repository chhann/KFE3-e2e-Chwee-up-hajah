import { ProductCardSkeleton } from '@/features/product-list/ui/ProductCardSkeleton';

import { ProductList } from '../../../features/product-list/ui/ProductList';
import type { Product } from '../types';

interface ProductSectionProps {
  products?: Product[];
  isLoading: boolean;
  className?: string;
}

export const ProductSection = ({ products, isLoading, className = '' }: ProductSectionProps) => {
  if (isLoading || !products) {
    return <ProductCardSkeleton />;
  }

  return <ProductList items={products} />;
};
