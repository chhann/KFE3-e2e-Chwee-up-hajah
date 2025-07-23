import { useState, useEffect } from 'react';

export type CountdownStatus = 'UPCOMING' | 'ACTIVE' | 'FINISHED';

interface CountdownParams {
  status: CountdownStatus;
  targetTime: Date;
}

export function useCountdown({ status, targetTime }: CountdownParams) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (status === 'FINISHED') {
      setRemainingTime(0);
      return;
    }

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      if (distance <= 0) {
        setRemainingTime(0);
        clearInterval(intervalId); // 시간이 다 되면 타이머 정지
      } else {
        setRemainingTime(Math.floor(distance / 1000));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, targetTime]);

  const getMessage = () => {
    switch (status) {
      case 'UPCOMING':
        return '핫딜 시작까지';
      case 'ACTIVE':
        return '핫딜 종료까지';
      case 'FINISHED':
        return '핫딜이 종료되었습니다.';
      default:
        return '';
    }
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    message: getMessage(),
    isTimeUp: remainingTime <= 0,
  };
}
