import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/shared/stores/auth';
import { Bid } from '@/shared/types/db';

import { useAuctionBid } from '@/shared/hooks/useAuctionBid';
import { useAuctionDetail } from '@/shared/hooks/useAuctionDetail';
import { useRealtimeBids } from '@/shared/hooks/useRealTimeBid';
import { useBidCostHandlers } from './useBidCostHandlers';
import { useSendBid } from './useSendBid';

export function useAuctionBidState(auctionId: string) {
  const { data, isLoading, error } = useAuctionDetail(auctionId); //데이터 가져오기
  const { mutate } = useAuctionBid();
  const bidderId = useAuthStore((state) => state.userId);

  const [displayBids, setDisplayBids] = useState<Bid[]>([]);
  const [displayCurrentPrice, setDisplayCurrentPrice] = useState<number>(0);

  const bidUnit = 5000;
  const minBidCostNumber = displayCurrentPrice + bidUnit;

  const [bidCost, setBidCost] = useState(minBidCostNumber);
  const [isUserChanged, setIsUserChanged] = useState(false);

  const prevMinBidCostNumber = useRef(minBidCostNumber);

  useEffect(() => {
    if (data) {
      setDisplayBids(data.bids || []);
      setDisplayCurrentPrice(data.current_price ?? 0);
    }
  }, [data]); // 초기 데이터 설정

  useRealtimeBids(
    auctionId,
    useCallback((newBid: Bid) => {
      setDisplayBids((prevBids) => [newBid, ...prevBids]);
      if (newBid.bid_price) setDisplayCurrentPrice(newBid.bid_price);
    }, [])
  ); // 실시간 입찰 업데이트

  const { minusBidCost, plusBidCost } = useBidCostHandlers(
    data?.status,
    setIsUserChanged,
    setBidCost,
    bidUnit,
    minBidCostNumber
  ); // 입찰 비용 핸들러

  useEffect(() => {
    if (!isUserChanged) setBidCost(minBidCostNumber);
    else if (bidCost < minBidCostNumber) setBidCost(minBidCostNumber);
    prevMinBidCostNumber.current = minBidCostNumber;
    // eslint-disable-next-line
  }, [minBidCostNumber]); // 입찰 비용이 변경될 때마다 사용자가 변경한 상태를 확인하고, 최소 입찰 비용을 유지합니다.

  const sendBid = useSendBid(data, auctionId, bidderId, bidCost, mutate); // 입찰 전송

  return {
    data,
    isLoading,
    error,
    displayBids,
    displayCurrentPrice,
    bidCost,
    minusBidCost,
    plusBidCost,
    sendBid,
    minBidCostNumber,
  };
}
