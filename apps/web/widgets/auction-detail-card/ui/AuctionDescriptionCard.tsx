'use client';
import { useState } from 'react';

import { AuctionBidHistoryCard } from '@/features/auction/ui/AuctionBidHistoryCard';

import { Bid } from '@/types/db';
import { cn } from '@repo/ui/utils/cn';
import { auctionDescriptionCardStyle } from './styles/AuctionDescriptionCard.styles';

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
    <div className={auctionDescriptionCardStyle.auctionDescriptionCardContainerStyle}>
      <div className={auctionDescriptionCardStyle.auctionDescriptionCardTabListStyle}>
        <div
          onClick={() => setTab('description')}
          className={cn(
            auctionDescriptionCardStyle.auctionDescriptionCardTabStyle,
            tab === 'description' &&
              auctionDescriptionCardStyle.auctionDescriptionCardTabActiveStyle
          )}
        >
          상품설명
        </div>
        <div
          onClick={() => setTab('bids')}
          className={cn(
            auctionDescriptionCardStyle.auctionDescriptionCardTabStyle,
            tab === 'bis' && auctionDescriptionCardStyle.auctionDescriptionCardTabActiveStyle
          )}
        >
          입찰기록
        </div>
      </div>

      {tab === 'description' ? (
        <div className={auctionDescriptionCardStyle.auctionDescriptionCardDescriptionStyle}>
          {description}
        </div>
      ) : (
        <div>
          {sortedBids.length === 0 ? (
            <div className={auctionDescriptionCardStyle.auctionDescriptionCardNoBidStyle}>
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
