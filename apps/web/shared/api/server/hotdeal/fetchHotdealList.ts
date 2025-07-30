import { HotDeal } from '@/shared/types/db';

// 핫딜 리스트 API 호출 함수
export const fetchHotdealList = async (): Promise<(HotDeal & { status: string })[]> => {
  const response = await fetch('/api/hot-deals');
  if (!response.ok) {
    throw new Error('핫딜 목록을 불러오는 데 실패했습니다.');
  }
  return response.json();
};
