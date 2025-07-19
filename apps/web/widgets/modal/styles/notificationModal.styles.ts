// styles/locationModal.ts
export const locationModalStyles = {
  // 모달 컨테이너
  modal: 'pt-15 items-start',

  // 모달 콘텐츠
  content: 'h-content w-[340px] bg-neutral-500 p-4 pb-0 text-white',

  // 배지
  badge: 'text-white',

  // 아이콘
  shieldIcon: 'mr-1 size-5 text-green-500',

  // 아이템 제목
  itemTitle: 'text-white',

  // 재설정 버튼
  resetButton: 'cursor-pointer text-[10px] text-blue-300 hover:text-blue-200',

  // 푸터
  footer: 'flex items-end justify-end',
};

// styles/locationPermissionModal.ts
export const locationPermissionModalStyles = {
  // 모달 콘텐츠
  content: 'h-content border-1 border-neutral-30 w-[295px] border-solid bg-white',

  // 메시지 영역
  messageArea:
    'flex w-full flex-col justify-center space-y-2 py-[70px] text-center text-sm font-semibold',

  // 모달 푸터
  footer: 'border-1 border-neutral-30 w-full border-b-0 border-l-0 border-r-0 border-solid',

  // 동의 버튼
  agreeButton: 'rounded-none bg-black text-white',
};

// styles/notificationModal.ts
export const notificationModalStyles = {
  // 모달 컨테이너
  modal: 'pt-15 items-start',

  // 모달 콘텐츠
  content: 'h-[500px] w-[340px] bg-[#F4F1FE] p-4 pb-0',

  // 로딩 컨테이너 (추가)
  loading: 'flex items-center justify-center p-8',

  // 빈 상태 메시지
  emptyMessage: 'text-center text-neutral-50 py-8',

  // 섹션 배지
  sectionBadge: 'text-neutral-70 mb-2',

  // 섹션 아이콘
  sectionIcon: 'mr-1 size-5',

  // 알림 아이템 래퍼
  notificationItemWrapper: 'cursor-pointer hover:opacity-80 transition-opacity',

  // 알림 아이템
  notificationItem: 'text-neutral-80 mb-4 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',

  // 아이템 제목
  itemTitle: 'w-[250px] truncate',

  // 아이템 콘텐츠
  itemContent: 'text-neutral-40 w-[240px] truncate',

  // 아이템 푸터
  itemFooter: 'flex items-end justify-between',

  // 가격 정보
  price: {
    label: 'mr-1 text-[12px]',
    amount: 'text-base',
  },

  // 시간 정보
  timestamp: 'flex-1 text-right text-[10px]',
};
