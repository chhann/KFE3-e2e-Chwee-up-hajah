'use client';
import { useState } from 'react';

import { AuctionBidHistoryCard } from '../../../entities/auction/ui/AuctionBidHistoryCard';

// 메인 컴포넌트
type Bid = {
  id: number;
  bidder: string;
  price: number;
  timestamp: string;
};

export const AuctionDescriptionCard = ({ bids }: { bids: Bid[] }) => {
  const [tab, setTab] = useState('description');

  const sortedBids = [...bids].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
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
        <div className="min-h-36 text-gray-700">
          이 상품은 고급 소재로 제작된 한정판 아이템입니다. 품질과 희소성을 자랑합니다.
        </div>
      ) : (
        <div>
          {sortedBids.map((bid) => (
            <AuctionBidHistoryCard key={bid.id} bid={bid} />
          ))}
        </div>
      )}
    </div>
  );
};
