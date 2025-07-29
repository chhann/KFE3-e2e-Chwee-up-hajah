'use client';

import { useParams } from 'next/navigation';

import { AuctionForm } from '@/widgets/auction-form';

const Page = () => {
  const params = useParams();
  const auctionId = params.auctionId as string;
  return <AuctionForm isEdit auctionId={auctionId} />;
};

export default Page;
