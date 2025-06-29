'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface AuctionDetailCardProps {
  currentBidCost: number;
  startBidCost: number;
  remainingTime: string;
  minBidCost: number;
  bidUnit: number;
  bidCost: number;
  isProgressing?: boolean;
  onMinus: () => void;
  onPlus: () => void;
  onClick: () => void;
}

export const AuctionDetailCard = ({
  currentBidCost,
  startBidCost,
  remainingTime,
  minBidCost,
  bidUnit,
  bidCost,
  isProgressing,
  onMinus,
  onPlus,
  onClick,
}: AuctionDetailCardProps) => {
  return (
    <section className="border-neutral-30 bg-neutral-0 flex w-full max-w-md flex-col items-center justify-center rounded-lg border p-4">
      <div className="mr-auto">
        <p className="text-neutral-30 text-sm">현재 입찰가</p>
        <p className="text-neutral-70 text-xl font-bold">{formatPriceNumber(currentBidCost)}원</p>
        <p className="text-neutral-30 text-xs">시작가 {formatPriceNumber(startBidCost)}원</p>
        <p className="text-xs text-red-500">남은 시간 : {remainingTime}</p>
      </div>
      <div className="text-neutral-70 my-6 flex items-center gap-5 font-bold">
        <Button variants="outline" onClick={onMinus} disabled={!isProgressing}>
          <FaMinus />
        </Button>
        {formatPriceNumber(bidCost)}원
        <Button variants="outline" onClick={onPlus} disabled={!isProgressing}>
          <FaPlus />
        </Button>
      </div>
      <div className="text-neutral-40 mb-2 mr-auto flex flex-col text-xs">
        <p>최소입찰가 : {formatPriceNumber(minBidCost)}원</p>
        <p>입찰 단위 : {formatPriceNumber(bidUnit)}원</p>
      </div>
      <Button
        variants="primary"
        size="thinLg"
        className="mt-2"
        onClick={onClick}
        disabled={!isProgressing}
      >
        입찰하기
      </Button>
    </section>
  );
};
