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
  isAuctionStarted: boolean;
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
  isAuctionStarted,
  onMinus,
  onPlus,
  onClick,
}: AuctionDetailCardProps) => {
  const userId = useAuthStore().userId;
  const { mutate } = useDeleteAuction();

  const handleDelete = () => {
    if (isAuctionStarted) {
      alert('경매가 시작되어 삭제가 불가능합니다.');
      return;
    }
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
        <div className={auctionDetailCardStyle.auctionDetailCardBidPriceContainerStyle}>
          <div>
            <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceLabelStyle}>
              현재 입찰가
            </p>
            <p className={auctionDetailCardStyle.auctionDetailCardCurrentPriceStyle}>
              {formatPriceNumber(currentBidCost)}원
            </p>
          </div>
          <div className={auctionDetailCardStyle.auctionDetailCardBidPriceRightContainerStyle}>
            <p className={auctionDetailCardStyle.auctionDetailCardRemainingTimeStyle}>
              남은 시간 : {remainingTime}
            </p>
            <p>최소입찰가 : {formatPriceNumber(minBidCost)}원</p>
          </div>
        </div>
        <div className={auctionDetailCardStyle.auctionDetailCardCurrentPriceNEditButtonContainer}>
          <p className={auctionDetailCardStyle.auctionDetailCardStartPriceStyle}>
            시작가 {formatPriceNumber(startBidCost)}원
          </p>
          <div className={auctionDetailCardStyle.auctionDetailCardBidUnitStyle}>
            <p>입찰 단위 : {formatPriceNumber(bidUnit)}원</p>
          </div>
        </div>
      </div>
      <div className={auctionDetailCardStyle.auctionDetailCardBidSectionStyle}>
        <div>
          <p>입찰가</p>
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
      </div>
      {userId === sellerId && !isAuctionStarted ? (
        <div className={auctionDetailCardStyle.auctionDetailCardEditButtonContainerStyle}>
          <Link href={`/auction/${auctionId}/auction-edit`} className="w-full">
            <Button variants="primary" size="thinLg">
              수정하기
            </Button>
          </Link>
          <Button variants="secondary" size="thinLg" onClick={handleDelete}>
            삭제하기
          </Button>
        </div>
      ) : (
        <Button
          variants="primary"
          size="thinLg"
          className={auctionDetailCardStyle.auctionDetailCardBidButtonStyle}
          onClick={onClick}
          disabled={!isProgressing}
        >
          입찰하기
        </Button>
      )}
    </section>
  );
};
