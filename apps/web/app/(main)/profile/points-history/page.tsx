import { PointsHistoryList } from '@/widgets/profile/ui/PointsHistoryList';

const Page = () => {
  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">적립내역</h1>
      <PointsHistoryList />
    </main>
  );
};

export default Page;
