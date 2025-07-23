export const userProfileCardStyles = {
  // 메인 컨테이너
  container: 'mb-7 rounded-[6px] bg-[var(--color-primary-50)] px-[18px] py-4',

  // 상단 프로필 영역
  profileSection: 'flex items-center gap-6',

  // 사용자 정보 영역
  userInfo: {
    wrapper: 'w-[220px]',
    header: 'flex items-end justify-between mb-1',
    username: 'text-base font-semibold',
    settingsIcon: 'size-4',
    email: 'mb-2 mb-1 text-xs not-italic',
  },

  // 구분선
  divider: 'my-4 border-white',

  pointsSection: {
    wrapper: 'flex items-center justify-between text-sm',
    gradeIcon: 'text-xl',
    gradeName: 'text-sm text-gray-700',
    pointsAmount: 'text-lg font-semibold text-gray-900',
    pointsLabel: 'text-gray-600',
  },
};
