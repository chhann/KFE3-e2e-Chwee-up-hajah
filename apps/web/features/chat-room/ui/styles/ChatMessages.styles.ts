export const containerStyles = 'flex flex-col gap-3 px-4 py-3';

export const messageRowStyles = {
  base: 'flex items-end',
  mine: 'justify-end',
  theirs: 'justify-start',
};

export const messageBubbleStyles = {
  base: 'relative max-w-[70%] rounded-xl px-4 py-2 text-sm leading-tight shadow-sm',
  mine: 'rounded-br-none bg-[var(--button-secondary-bg)] text-[var(--button-primary-text)]',
  theirs: 'rounded-bl-none bg-[var(--bg-disabled)] text-[var(--text-primary)]',
};

export const timestampStyles = {
  base: 'mb-[2px] text-[6px] whitespace-nowrap',
  mine: 'mr-1 text-[var(--text-tertiary)]', // 좌측
  theirs: 'ml-1 text-[var(--text-tertiary)]', // 우측
};

export const unreadIndicatorStyles = 'text-[18px] text-[var(--text-error)]';
