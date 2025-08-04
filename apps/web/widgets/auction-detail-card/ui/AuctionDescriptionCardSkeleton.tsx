import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

export const AuctionDescriptionCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg">
      <Skeleton variant="title" className="w-1/4" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  );
};
