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

export const formatToYMD = (dateStr: string) => {
  const date = new Date(dateStr + 'Z');
  const target = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  // 한국 시간으로 변환 (UTC+9)
  const year = target.getFullYear();
  const month = target.getMonth() + 1;
  const day = target.getDate();

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};
