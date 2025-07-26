// 경매 남은 시간
export const getTimeRemainingUTC = (endTimeStr: string) => {
  const now = new Date();
  const endTime = new Date(endTimeStr + 'Z'); // UTC 해석 보정
  const total = endTime.getTime() - now.getTime();

  const totalHours = Math.floor(total / (1000 * 60 * 60)); // 총 시간
  const minutes = Math.floor((total / (1000 * 60)) % 60); // 남은 분

  return {
    total,
    hours: totalHours,
    minutes,
  };
};
