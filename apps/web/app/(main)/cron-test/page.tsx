'use client';

import { useEffect } from 'react';

export default function TestCronPage() {
  useEffect(() => {
    // 개발환경에서만 10초마다 실행
    if (process.env.NODE_ENV === 'development') {
      console.log('개발용 크론 테스트 시작');

      const interval = setInterval(() => {
        fetch('/api/cron/check-auctions')
          .then((res) => res.json())
          .then((data) => console.log('Cron result:', data))
          .catch((error) => console.error('Cron error:', error));
      }, 10000);

      return () => {
        console.log('개발용 크론 테스트 종료');
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">개발용 크론 테스트</h1>
      <p>개발환경에서 10초마다 경매 종료 체크를 실행합니다.</p>
      <p>콘솔을 확인하세요.</p>
    </div>
  );
}
