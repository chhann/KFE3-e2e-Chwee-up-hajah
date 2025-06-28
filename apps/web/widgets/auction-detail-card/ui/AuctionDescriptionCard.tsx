'use client';
import { useState } from 'react';

import { AuctionBidHistoryCard } from '../../../features/auction/ui/AuctionBidHistoryCard';
import { Bid } from '../../../types/db';

export const AuctionDescriptionCard = ({
  bids,
  description,
}: {
  bids: Bid[];
  description: string;
}) => {
  const [tab, setTab] = useState('description');

  const sortedBids = [...bids].sort(
    (a, b) => new Date(b.bid_time).getTime() - new Date(a.bid_time).getTime()
  );

  return (
    <div className="text-neutral-70 w-full rounded-lg px-5 py-2">
      <div className="mb-4 flex justify-around">
        <div
          onClick={() => setTab('description')}
          className={`px-4 py-2 ${tab === 'description' ? 'border-b-2 border-black font-bold' : ''}`}
        >
          상품설명
        </div>
        <div
          onClick={() => setTab('bids')}
          className={`px-4 py-2 ${tab === 'bids' ? 'border-b-2 border-black font-bold' : ''}`}
        >
          입찰기록
        </div>
      </div>

      {tab === 'description' ? (
        <div className="min-h-36 whitespace-pre-line text-center text-gray-700">{description}</div>
      ) : (
        <div>
          {sortedBids.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              아직 입찰자가 없습니다.
              <br />
              첫번째 입찰자가 되어보세요!
            </div>
          ) : (
            sortedBids.map((bid) => <AuctionBidHistoryCard key={bid.bid_id} bid={bid} />)
          )}
        </div>
      )}
    </div>
  );
};
