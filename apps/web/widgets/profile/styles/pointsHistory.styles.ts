// styles/pointsHistory.styles.ts

export const pointsHistoryListStyles = {
  // 섹션 전체
  section: '',

  // 제목 (스크린 리더용)
  title: 'sr-only',

  // 필터 선택 영역
  filterContainer: 'mb-2 w-full text-right',
  filterSelect: 'text-neutral-70 my-2 w-1/2 rounded-sm p-1 shadow-md',

  // 로딩 상태
  loading: {
    container: 'flex items-center justify-center p-8',
    spinner: 'animate-spin',
  },

  // 빈 상태 메시지
  emptyMessage: 'py-8 text-center text-gray-500',

  // 리스트 컨테이너
  listContainer: 'space-y-0', // 간격은 구분선으로 처리

  // 개별 아이템 래퍼
  itemWrapper: '',

  // 리스트 아이템
  listItem: '',

  // 아이템 제목 (스크린 리더용)
  itemTitle: 'sr-only',

  // 아이템 내용 스타일
  item: {
    // Item 컴포넌트 (외부)
    container: '',

    // ItemContent
    content: 'flex items-start',

    // ItemTitle 영역
    titleWrapper: 'flex-1 overflow-hidden',
    titleLabel: 'sr-only', // "적립 내역 제목: "
    titleText: 'truncate text-base font-[600]',

    // 날짜/시간 영역
    dateContainer: '',
    dateTime: 'text-sm text-gray-500',

    // 포인트 표시 영역
    pointsContainer: 'text-lg',
    pointsLabel: 'sr-only', // "적립된 포인트: "
    pointsAmount: 'font-[700]',
  },

  // 구분선
  divider: 'my-2 h-[1px] border-0 bg-neutral-300',

  // 색상 클래스들
  colors: {
    positive: 'text-primary-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500',
  },
};
