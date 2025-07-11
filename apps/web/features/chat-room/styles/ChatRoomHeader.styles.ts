export const chatHeaderStyles = {
  container: 'rounded-[6px] p-4 bg-[var(--bg-disabled)] text-[var(--text-primary)] shadow-sm',

  topSection: 'flex items-start justify-between',

  productInfo: 'flex flex-col gap-1 overflow-hidden',

  productName: 'truncate text-base font-semibold',

  nickname: 'truncate text-sm text-[var(--text-secondary)]',

  bidInfo: 'whitespace-nowrap text-right text-sm font-semibold text-[var(--text-primary)]',

  bidAmount: 'text-base',

  bottomSection: 'mt-2 flex items-center justify-between text-sm text-[var(--text-secondary)]',

  locationWrapper: 'flex items-center gap-1',

  locationIcon: 'text-[var(--color-error-500)]',

  doneButton:
    'rounded-[6px] bg-[var(--color-primary-600)] px-3 py-1 text-sm text-[var(--text-inverse)]',
};
