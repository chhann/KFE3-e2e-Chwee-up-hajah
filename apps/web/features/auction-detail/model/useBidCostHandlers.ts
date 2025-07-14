import { useCallback } from 'react';

export function useBidCostHandlers(
  status: string | undefined,
  setIsUserChanged: (v: boolean) => void,
  setBidCost: (updater: (prev: number) => number) => void,
  bidUnit: number,
  minBidCostNumber: number
) {
  const minusBidCost = useCallback(() => {
    if (status === undefined) {
      alert('경매 상태를 확인할 수 없습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (status === 'ready') {
      alert('경매가 시작되지 않았습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    setIsUserChanged(true);
    setBidCost((prev: number) => {
      const newCostNumber = prev - bidUnit;
      const minBidNumber = minBidCostNumber;
      const finalCost = newCostNumber < minBidNumber ? minBidNumber : newCostNumber;
      return finalCost;
    });
  }, [status, setIsUserChanged, setBidCost, bidUnit, minBidCostNumber]); // 입찰 비용 감소 핸들러

  const plusBidCost = useCallback(() => {
    if (status === undefined) {
      alert('경매 상태를 확인할 수 없습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    if (status === 'ready') {
      alert('경매가 시작되지 않았습니다. 입찰을 진행할 수 없습니다.');
      return;
    }
    setIsUserChanged(true);
    setBidCost((prev: number) => prev + bidUnit);
  }, [status, setIsUserChanged, setBidCost, bidUnit]); // 입찰 비용 증가 핸들러

  return { minusBidCost, plusBidCost };
}
