export const searchInputStyles = {
  // 폼 컨테이너
  form: 'mb-2 flex w-full items-center gap-2',

  // 검색 입력 래퍼
  inputWrapper: 'border-1 relative w-full rounded-[10px] border-neutral-700',

  // 검색 입력 필드
  input:
    'focus-visible:outline-primary-500 w-full p-3 pr-12 focus-visible:rounded-[10px] focus-visible:outline-0 focus-visible:outline-offset-0',

  // 검색 버튼
  button: {
    base: 'h-7 cursor-pointer absolute right-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500 flex items-center justify-center',
  },

  // 검색 아이콘
  icon: 'absolute  top-1/2 size-5 -translate-y-1/2 text-neutral-500',
};
