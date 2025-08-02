export const chatHeaderStyles = {
  container:
    'flex flex-col  p-2 bg-[#eeeeee] text-[var(--text-primary)] w-[calc(100%+2rem)] ml-[-1rem] mr-[-1rem]',
  topSection: 'flex w-full items-start gap-4',
  thumbnail: 'h-14 w-14 flex-shrink-0 rounded-[8px] object-cover',
  productDetails: 'flex flex-1 flex-col overflow-hidden',
  productName: 'truncate text-base font-semibold',
  bidSection: 'flex items-center justify-between',
  bidAmount: 'text-sm font-medium text-[var(--text-secondary)]',
  statusBadge: 'rounded-md px-2 py-0.5 text-xs font-semibold',
  transactionSection: 'w-full',
};
