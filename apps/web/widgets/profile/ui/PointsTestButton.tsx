'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const PointsTestButton = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pointsAddMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/point/add-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('포인트 적립 실패');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('포인트 적립 성공:', data);
      alert(`${data.points}P 적립되었습니다!`);
      router.refresh();
    },
    onError: (error) => {
      console.error('포인트 적립 실패:', error);
      alert('포인트 적립에 실패했습니다.');
    },
  });

  const pointsDeductMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/point/deduct-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('포인트 차감 실패');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('포인트 차감 성공:', data);
      alert(`${data.points}P 차감되었습니다!`);
      router.refresh();
    },
    onError: (error) => {
      console.error('포인트 차감 실패:', error);
      alert('포인트 차감에 실패했습니다.');
    },
  });

  const handleTestAddPoints = () => {
    pointsAddMutation.mutate();
  };

  const handleTestDeductPoints = () => {
    pointsDeductMutation.mutate();
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-neutral-400">*포인트 적립/차감 테스트용 버튼입니다.</p>
      <div className="flex">
        <div className="p-4">
          <button
            onClick={handleTestAddPoints}
            disabled={pointsAddMutation.isPending}
            className={`rounded-md px-4 py-2 font-medium transition-colors ${
              pointsAddMutation.isPending
                ? 'cursor-not-allowed bg-gray-400 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {pointsAddMutation.isPending ? '적립 중...' : '포인트 적립'}
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={handleTestDeductPoints}
            disabled={pointsDeductMutation.isPending}
            className={`rounded-md px-4 py-2 font-medium transition-colors ${
              pointsDeductMutation.isPending
                ? 'cursor-not-allowed bg-gray-400 text-white'
                : 'bg-sky-700 text-white hover:bg-sky-900'
            }`}
          >
            {pointsDeductMutation.isPending ? '차감 중...' : '포인트 차감'}
          </button>
        </div>
      </div>
    </div>
  );
};

// export default PointsTestButton;
