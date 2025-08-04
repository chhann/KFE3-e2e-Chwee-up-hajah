import { cva } from 'class-variance-authority';

export const getSkeletonVariants = cva('animate-pulse bg-gray-300', {
  variants: {
    variant: {
      text: 'h-4 w-full',
      title: 'h-6 w-3/4',
      avatar: 'h-12 w-12 rounded-full',
      thumbnail: 'h-24 w-full',
      button: 'h-10 w-20',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});
