'use client';

import { AuctionForm } from '@/widgets/auction-form';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const auctionId = params.auctionId as string;
  return <AuctionForm isEdit auctionId={auctionId} />;
};

export default Page;
