import { ChargeHistoryList } from '@/widgets/profile/ui/ChargeHistoryList';

const Page = () => {
  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">충전내역</h1>
      <ChargeHistoryList />
    </main>
  );
};

export default Page;
