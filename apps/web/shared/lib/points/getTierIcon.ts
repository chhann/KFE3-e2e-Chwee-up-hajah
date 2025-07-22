// 등급별 아이콘 매핑
export const getTierIcon = (tier: string): string => {
  const tierIcons: Record<string, string> = {
    숲: '🌲🌲🌲',
    나무: '🌲',
    새싹: '🌱',
    씨앗: '🌰',
  };
  return tierIcons[tier] || '🌰';
};
