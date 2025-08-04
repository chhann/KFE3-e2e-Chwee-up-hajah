import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

export const HotdealInfoCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg">
      <Skeleton variant="thumbnail" className="h-[208px] w-full" />
      <Skeleton variant="title" className="w-full" />
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <div className="mb-2 flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <Skeleton variant="text" className="w-full" />
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <div className="mb-2 flex justify-center">
        <Skeleton variant="text" className="w-1/3" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
      <Skeleton variant="text" className="w-1/4" />

      <Skeleton variant="title" className="mt-8 w-1/4" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  );
};
