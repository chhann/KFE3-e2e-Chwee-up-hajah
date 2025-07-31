export const notificationModalStyles = {
  // 모달 컨테이너
  modal: 'pt-15 items-start',

  // 모달 콘텐츠
  content: 'h-[500px] w-[340px] bg-white p-4',

  // 로딩 컨테이너 (추가)
  loading: 'flex items-center justify-center p-8',

  // 빈 상태 메시지
  emptyMessage: 'text-center text-neutral-50 py-8',

  // 섹션 배지
  sectionBadge: 'text-neutral-70 mb-2',

  // 섹션 아이콘
  sectionIcon: 'mr-1 size-5',

  // 알림 아이템 래퍼
  notificationItemWrapper: 'cursor-pointer',

  // 알림 아이템
  notificationItem: 'text-neutral-80 bg-white border-b border-gray-200 hover:bg-gray-200',

  // 아이템 제목
  itemTitle: 'w-[250px] truncate',

  // 아이템 콘텐츠
  itemContent: 'text-neutral-40 w-[240px] truncate',

  // 아이템 푸터
  itemFooter: 'flex items-end',

  // 가격 정보
  price: {
    label: 'mr-1 text-[12px] font-[var(--font-semibold)]',
    amount: 'inline-block text-base w-25 truncate',
  },

  // 시간 정보
  timestamp: 'text-right text-[10px]',
};
