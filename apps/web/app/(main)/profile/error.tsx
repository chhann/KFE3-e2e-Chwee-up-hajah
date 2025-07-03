'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center" role="main">
      <div className="flex items-center space-x-6">
        <div className="border-r border-gray-300 pr-6 text-2xl font-medium text-gray-400">오류</div>
        <div>
          <p className="text-gray-700">프로필 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    </main>
  );
}
