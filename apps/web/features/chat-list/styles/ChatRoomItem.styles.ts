export const itemStyles = {
  base: 'group relative h-[93px] w-full cursor-pointer overflow-hidden rounded-[6px] border border-white/10 px-4 py-3 shadow-[0_6px_12px_-2px_rgba(0,0,0,0.2)] backdrop-blur-sm transition',
  bg: 'bg-[var(--button-secondary-bg)]',
  activeBg: 'active:bg-[var(--button-secondary-bg-active)]',
};

export const textStyles = {
  productName: 'truncate text-sm font-semibold text-[var(--button-primary-text)]',
  opponentNickname: 'truncate text-xs text-[var(--button-primary-text)]',
  location: 'flex items-center gap-1 truncate text-xs text-[var(--button-primary-text)]',
  locationIcon: 'leading-none text-[var(--text-accent)]',
  priceLabel:
    'mb-[2px] text-[10px] leading-none text-[var(--text-secondary)] group-active:text-[var(--button-primary-text)]',
  price: 'text-base font-bold leading-tight text-[var(--button-primary-text)]',
};

export const badgeStyles = {
  wrapper:
    'absolute top-2 right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--text-error)] px-1.5 text-[10px] font-semibold text-white shadow-md',
};
