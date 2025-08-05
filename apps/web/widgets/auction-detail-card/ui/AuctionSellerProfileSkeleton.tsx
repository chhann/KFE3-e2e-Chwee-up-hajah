import { Skeleton } from '@repo/ui/design-system/base-components/Skeleton/index';

export const AuctionSellerProfileSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg">
      <Skeleton variant="avatar" />
      <div className="flex flex-col gap-2">
        <Skeleton variant="title" className="w-24" />
        <Skeleton variant="text" className="w-32" />
      </div>
    </div>
  );
};
