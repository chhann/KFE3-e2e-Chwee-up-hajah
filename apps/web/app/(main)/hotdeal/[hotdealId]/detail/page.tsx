'use client';

import { CountdownStatus, useCountdown } from '@/features/hotdeal/model/useCountdown';
import { useHotdealDetailQuery } from '@/shared/api/client/hotdeal/useHotdealDetail';
import { usePurchaseHotdeal } from '@/shared/api/client/hotdeal/usePurchaseHotdeal';
import { useAuthStore } from '@/shared/stores/auth';
import { HotdealInfoCard } from '@/widgets/hotdeal-info-card';
import { LoadingSpinner } from '@/widgets/loading-spiner';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { use, useMemo } from 'react';

export default function Page({ params }: { params: Promise<{ hotdealId: string }> }) {
  const { hotdealId } = use(params);
  const { data, isLoading, isError, error } = useHotdealDetailQuery(hotdealId);
  const userId = useAuthStore((state) => state.userId);
  const purchaseMutation = usePurchaseHotdeal(hotdealId);

  const { status, targetTime } = useMemo(() => {
    if (!data) {
      return { status: 'FINISHED' as CountdownStatus, targetTime: new Date() };
    }
    const now = new Date();
    const startTime = new Date(data.start_time);
    const endTime = new Date(data.end_time);
    if (now < startTime) {
      return { status: 'UPCOMING' as CountdownStatus, targetTime: startTime };
    }
    if (now >= startTime && now < endTime) {
      return { status: 'ACTIVE' as CountdownStatus, targetTime: endTime };
    }
    return { status: 'FINISHED' as CountdownStatus, targetTime: endTime };
  }, [data]);

  const countdown = useCountdown({ status, targetTime });

  const handlePurchase = () => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (data) {
      purchaseMutation.mutate({ hotdealId, userId, purchasePrice: data.current_price });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        <p>오류: {error?.message}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>핫딜 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <HotdealInfoCard data={data} countdown={countdown} />

      <Button
        variants="custom"
        className="sticky bottom-0 bg-purple-500 text-white transition-colors hover:bg-purple-600"
        size="thinLg"
        onClick={handlePurchase}
        disabled={status !== 'ACTIVE' || purchaseMutation.isPending}
      >
        {purchaseMutation.isPending
          ? '처리 중...'
          : status === 'ACTIVE'
            ? '지금 구매'
            : status === 'UPCOMING'
              ? '구매 불가 (시작 전)'
              : '구매 불가 (종료)'}
      </Button>
    </div>
  );
}
