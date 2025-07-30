export const confirmDialogStyles = {
  // 배경 오버레이
  backdrop: 'fixed inset-0 z-50 mx-auto flex max-w-[375px] items-center justify-center bg-black/70',

  // 다이얼로그 컨테이너
  container: 'w-[346px] rounded-lg bg-white p-5 text-center shadow-xl',

  // 제목
  title: 'mb-2 text-lg font-[var(--font-semibold)] text-gray-900',

  // 설명 텍스트
  description: 'mb-6 text-sm leading-relaxed text-neutral-500',

  // 버튼 컨테이너
  buttonContainer: 'flex gap-2',

  // 취소 버튼
  cancelButton:
    'w-full cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50',

  // 확인 버튼
  confirmButton:
    'bg-primary-500 hover:bg-primary-600 w-full cursor-pointer rounded px-4 py-2 text-sm font-medium text-white transition-colors',
};
