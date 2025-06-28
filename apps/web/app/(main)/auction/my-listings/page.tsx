import { AuctionListings } from '@/widgets/auction-listings/ui/AuctionListings';

import { mockListings } from '@/mock/auction';

const Page = () => {
  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">판매중인 물품</h1>
      <AuctionListings listData={mockListings} />
    </main>
  );
};

export default Page;
