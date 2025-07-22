// 등급별 아이콘 매핑
export const getGradeIcon = (grade: string): string => {
  const gradeIcons: Record<string, string> = {
    숲: '🌲🌲🌲',
    나무: '🌲',
    새싹: '🌱',
    씨앗: '🌰',
    애벌레: '🐛',
    돌멩이: '🪨',
    흙: '🕳️',
  };
  return gradeIcons[grade] || '🌰';
};
