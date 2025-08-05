import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

export const AuctionDetailCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg">
      <div className="flex justify-between">
        <Skeleton variant="title" className="w-full" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/3" />
      </div>
      <div className="flex justify-end">
        <Skeleton variant="text" className="w-1/3" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="button" className="h-12 w-1/2" />
      </div>
      <Skeleton variant="button" className="h-12 w-full" />
    </div>
  );
};
