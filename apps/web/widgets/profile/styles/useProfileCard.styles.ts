export const userProfileCardStyles = {
  // 메인 컨테이너
  container: 'mb-7 rounded-[6px] bg-[var(--color-primary-50)] px-[18px] py-4',

  // 상단 프로필 영역
  profileSection: 'flex items-center gap-6',

  // 사용자 정보 영역
  userInfo: {
    wrapper: 'w-[220px]',
    header: 'flex items-center justify-between',
    username: 'mb-1 text-sm font-semibold',
    settingsIcon: 'size-4',
    email: 'mb-1 text-xs not-italic',
  },

  // 구분선
  divider: 'my-4 border-white',

  // 크레딧 정보 영역
  creditSection: {
    wrapper: 'text-sm',
    temperature: 'text-sm',
    creditInfo: 'flex items-center text-sm',
    creditAmount: 'mr-1 text-lg font-semibold',
    creditLabel: '',
  },
};
