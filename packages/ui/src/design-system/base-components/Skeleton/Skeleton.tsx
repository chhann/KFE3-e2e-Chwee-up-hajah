'use client';

import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../../utils/cn';
import { getSkeletonVariants } from './Skeleton.styles';

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof getSkeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return <div className={cn(getSkeletonVariants({ variant }), className)} ref={ref} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
