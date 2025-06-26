'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HandlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get('data'); // e.g. "web+myapp://open-profile?id=123"
  const [message, setMessage] = useState('처리 중...');

  useEffect(() => {
    if (!data) return;

    try {
      // web+myapp://open-profile?id=123 형태를 파싱
      const url = new URL(data);
      const action = url.hostname; // "open-profile"
      const params = Object.fromEntries(url.searchParams); // { id: "123" } 등

      switch (action) {
        case 'open-profile':
          setMessage(`✅ 유저 ${params.id} 프로필로 이동 중...`);
          setTimeout(() => router.push(`/profile/${params.id}`), 1500);
          break;

        case 'search':
          setMessage(`🔍 "${params.query}" 검색 중...`);
          setTimeout(() => router.push(`/search?query=${params.query}`), 1500);
          break;

        default:
          setMessage(`❓ 알 수 없는 액션: ${action}`);
          setTimeout(() => router.push('/'), 2000);
          break;
      }
    } catch (error) {
      console.error(error);
      setMessage('⚠️ 잘못된 링크 형식입니다. 홈으로 돌아갑니다.');
      setTimeout(() => router.push('/'), 2000);
    }
  }, [data, router]);

  return (
    <div className="flex min-h-screen items-center justify-center text-xl font-medium">
      {message}
    </div>
  );
}
