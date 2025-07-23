import { redirect } from 'next/navigation';

const Page = () => {
  return redirect('/main'); // ✅ 자동으로 /main 으로 이동
};

export default Page;
