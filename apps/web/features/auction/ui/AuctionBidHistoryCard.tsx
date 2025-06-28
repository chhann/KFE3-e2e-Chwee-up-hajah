import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';

import { Bid } from '../../../types/db';

export const AuctionBidHistoryCard = ({ bid }: { bid: Bid }) => {
  const dateObj = new Date(bid.bid_time);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="mb-3 rounded-lg p-4 shadow-md">
      <div>
        <span>{dateStr}</span>
        <span className="mx-2"></span>
        <span>{timeStr}</span>
      </div>
      <div className="flex items-center">
        <span>{bid.user?.username}</span>
        <span className="mx-1">·</span>
        <span className="font-semibold">{formatPriceNumber(bid.bid_price)}원</span>
      </div>
    </div>
  );
};
