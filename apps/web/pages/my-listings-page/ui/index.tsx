import { AuctionListings } from '../../../widgets/auction-listings/ui/AuctionListings';

export const MyListingsPage = () => {
  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">판매중인 물품</h1>

      <AuctionListings />
    </main>
  );
};
