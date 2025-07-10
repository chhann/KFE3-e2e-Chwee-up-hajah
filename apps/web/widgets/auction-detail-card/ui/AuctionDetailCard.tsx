'use client';

import { useDeleteAuction } from '@/shared/api/client/auction/useDeleteAuction';
import { useAuthStore } from '@/shared/stores/auth';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { formatPriceNumber } from '@repo/ui/utils/formatNumberWithComma';
import Link from 'next/link';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { auctionDetailCardStyle } from './styles/AuctionDetailCard.styles';

interface AuctionDetailCardProps {
  currentBidCost: number;
  startBidCost: number;
  remainingTime: string;
  minBidCost: number;
  bidUnit: number;
  bidCost: number;
  isProgressing?: boolean;
  auctionId: string;
  sellerId: string;
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
  auctionId,
  sellerId,
  onMinus,
  onPlus,
  onClick,
}: AuctionDetailCardProps) => {
  const userId = useAuthStore().userId;
  const { mutate } = useDeleteAuction();
  const handleDelete = () => {
    if (userId !== sellerId) {
      return alert('본인 경매만 삭제할 수 있습니다.');
    }
    const isConfirm = window.confirm('경매를 삭제하시겠습니까?');
    if (isConfirm) {
      mutate(auctionId);
    } else {
      return;
    }
  };
  return (
    <section className={auctionDetailCardStyle.auctionDetailCardContainerStyle}>
      <div className={auctionDetailCardStyle.auctionDetailCardHeaderStyle}>
        <div className={auctionDetailCardStyle.auctionDetailCardCurrentPriceNEditButtonContainer}>
          <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceLabelStyle}>
            현재 입찰가
          </p>
          {userId === sellerId && (
            <div className={auctionDetailCardStyle.auctionDetailCardEditButtonContainerStyle}>
              <Link href={`/auction/${auctionId}/auction-edit`}>
                <Button variants="primary">수정하기</Button>
              </Link>
              <Button variants="secondary" onClick={handleDelete}>
                삭제하기
              </Button>
            </div>
          )}
        </div>
        <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceStyle}>
          {formatPriceNumber(currentBidCost)}원
        </p>
        <p className={auctionDetailCardStyle.auctionDetailCardStartPriceStyle}>
          시작가 {formatPriceNumber(startBidCost)}원
        </p>
        <p className={auctionDetailCardStyle.auctionDetailCardRemainingTimeStyle}>
          남은 시간 : {remainingTime}
        </p>
      </div>
      <div className={auctionDetailCardStyle.auctionDetailCardBidControlStyle}>
        <Button variants="outline" onClick={onMinus} disabled={!isProgressing}>
          <FaMinus />
        </Button>
        {formatPriceNumber(bidCost)}원
        <Button variants="outline" onClick={onPlus} disabled={!isProgressing}>
          <FaPlus />
        </Button>
      </div>
      <div className={auctionDetailCardStyle.auctionDetailCardInfoStyle}>
        <p>최소입찰가 : {formatPriceNumber(minBidCost)}원</p>
        <p>입찰 단위 : {formatPriceNumber(bidUnit)}원</p>
      </div>
      <Button
        variants="primary"
        size="thinLg"
        className={auctionDetailCardStyle.auctionDetailCardBidButtonStyle}
        onClick={onClick}
        disabled={!isProgressing}
      >
        입찰하기
      </Button>
    </section>
  );
};
