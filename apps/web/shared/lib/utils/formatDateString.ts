import { getToday } from '@repo/ui/utils/getToday';

// Timezone 문제 해결을 위해 로컬 시간 기준으로 날짜 문자열을 생성하는 헬퍼 함수
export const formatDateString = (dateString: string | null | undefined): string => {
  if (!dateString) return getToday();

  const date = new Date(dateString);

  // Invalid Date인지 확인
  if (isNaN(date.getTime())) {
    return getToday();
  }

  // toISOString() 대신 로컬 시간대 구성요소를 사용하여 YYYY-MM-DD 형식 생성
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
