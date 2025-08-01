import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addPoint } from '@/shared/api/server/point/addPoint';

export const useAddPoint = ({ userId }: { userId: string }) => {
  return useMutation({
    mutationFn: async () => addPoint(userId),
    onSuccess: (data) => {
      console.log('포인트 적립 성공:', data);
      toast.success(`${data.points}P 적립되었습니다!`);
    },
    onError: (error) => {
      console.error('포인트 적립 실패:', error);
      toast.error('포인트 적립에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
