import { useQuery } from '@tanstack/react-query';

export const usePointsHistory = (filter: string) => {
  return useQuery({
    queryKey: ['points-history', filter],
    queryFn: async () => {
      const res = await fetch(`/api/point/history?filter=${filter}`);
      if (!res.ok) throw new Error('포인트 적립 내역을 불러오지 못했습니다.');
      return res.json();
    },
  });
};
