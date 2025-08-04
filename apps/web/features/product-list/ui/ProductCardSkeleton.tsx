import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

export const ProductCardSkeleton = () => {
  return (
    <div className="flex h-[270px] w-full flex-col gap-2">
      <Skeleton variant="thumbnail" />
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  );
};
