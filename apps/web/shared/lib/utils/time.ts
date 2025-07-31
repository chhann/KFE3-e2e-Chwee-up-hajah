// 경매 남은 시간
export const getTimeRemainingUTC = (endTimeStr: string) => {
  const now = new Date();
  const endTime = new Date(endTimeStr + 'Z'); // UTC 해석 보정
  const total = endTime.getTime() - now.getTime();

  const totalHours = Math.floor(total / (1000 * 60 * 60)); // 총 시간
  const minutes = Math.floor((total / (1000 * 60)) % 60); // 남은 분

  return {
    total,
    hours: String(totalHours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  };
};

// 날짜를 YYYY-MM-DD 형식으로 변환
export const formatToYMD = (dateStr: string) => {
  const date = new Date(dateStr + 'Z');
  const target = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  // 한국 시간으로 변환 (UTC+9)
  const year = target.getFullYear();
  const month = target.getMonth() + 1;
  const day = target.getDate();

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// 메세지 시간 포맷팅
export const formatGetMessageTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return ''; // 메시지가 없을 때 빈 문자열 반환

  const date = new Date(dateStr); // ISO 8601 포맷으로 변환 필요 없음
  const target = new Date(date.getTime() + 9 * 60 * 60 * 1000); // KST 보정

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 오늘 00시
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const isToday = targetMidnight.getTime() === today.getTime();

  const year = target.getFullYear();
  const month = target.getMonth() + 1;
  const day = target.getDate();
  let hour = target.getHours();
  const minute = target.getMinutes().toString().padStart(2, '0');

  const period = hour < 12 ? '오전' : '오후';
  hour = hour % 12 === 0 ? 12 : hour % 12;

  const timeStr = `${period} ${hour}:${minute}`;

  if (isToday) {
    return timeStr;
  }

  const isSameYear = now.getFullYear() === target.getFullYear();
  if (isSameYear) {
    return `${month}월 ${day}일 `;
  } else {
    return `${year}. ${month}.  ${day}`;
  }
};
