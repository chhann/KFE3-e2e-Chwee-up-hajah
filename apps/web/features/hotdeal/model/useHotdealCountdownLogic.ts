import { HotDeal } from '@/shared/types/db';
import { useMemo } from 'react';
import { CountdownStatus, useCountdown } from './useCountdown';

interface UseHotdealCountdownLogicProps {
  data: HotDeal | undefined;
}

export const useHotdealCountdownLogic = ({ data }: UseHotdealCountdownLogicProps) => {
  const { status, targetTime } = useMemo(() => {
    if (!data) {
      return { status: 'FINISHED' as CountdownStatus, targetTime: new Date() };
    }

    const now = new Date();
    const startTime = new Date(data.start_time);
    const endTime = new Date(data.end_time);

    let currentStatus: CountdownStatus;
    let currentTargetTime: Date;

    if (now.getTime() < startTime.getTime()) {
      currentStatus = 'UPCOMING';
      currentTargetTime = startTime;
    } else if (now.getTime() >= startTime.getTime() && now.getTime() < endTime.getTime()) {
      currentStatus = 'ACTIVE';
      if (data.current_price > data.min_price) {
        const lastPriceDropBaseTime = data.last_price_drop_at
          ? new Date(data.last_price_drop_at)
          : startTime;

        let nextPriceDropTime = new Date(
          lastPriceDropBaseTime.getTime() + data.price_drop_interval_minutes * 60 * 1000
        );

        if (nextPriceDropTime.getTime() > endTime.getTime()) {
          nextPriceDropTime = endTime;
        }
        currentTargetTime = nextPriceDropTime;
      } else {
        currentTargetTime = endTime;
      }
    } else {
      currentStatus = 'FINISHED';
      currentTargetTime = endTime;
    }

    return { status: currentStatus, targetTime: currentTargetTime };
  }, [data]);
  const countdown = useCountdown({ status, targetTime });

  const hotdealMessage = useMemo(() => {
    switch (status) {
      case 'UPCOMING':
        return '핫딜 시작까지';
      case 'ACTIVE':
        if (data && data.current_price > data.min_price) {
          return '가격 인하까지';
        } else {
          return '핫딜 종료까지';
        }
      case 'FINISHED':
        return '핫딜이 종료되었습니다.';
      default:
        return '';
    }
  }, [status, data]);

  countdown.message = hotdealMessage;

  return { countdown, status, targetTime };
};
