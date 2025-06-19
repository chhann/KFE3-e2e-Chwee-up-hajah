import AuctionCard from '../entities/auction/ui/AuctionCard';

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <AuctionCard
        imageSrc="./favicon.ico"
        badgeVariant="best"
        title="파비콘"
        locationName="서울시 강남구"
        endTime={new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)}
        bidStartPrice={70000}
        bidCurrentPrice={80000}
        bidCount={23}
      />
      page
    </main>
  );
};

export default Page;
