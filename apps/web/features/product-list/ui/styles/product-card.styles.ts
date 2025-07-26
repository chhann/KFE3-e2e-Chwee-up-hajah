export const Styles = {
  container: (layout: 'horizontal' | 'vertical') =>
    `overflow-hidden rounded-[var(--radius-xl)] bg-[var(--bg-primary)] ${
      layout === 'horizontal'
        ? 'flex h-[211px] w-[140px] flex-col p-[var(--spacing-2)]'
        : 'flex w-full gap-[var(--spacing-3)] p-[var(--spacing-3)] shadow-[var(--shadow-sm)]'
    }`,

  imageContainer: (layout: 'horizontal' | 'vertical') =>
    `${
      layout === 'horizontal' ? 'mb-[var(--spacing-2)] h-[77px] w-full' : 'h-[6rem] w-[6rem]'
    } flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-disabled)]`,
  image: 'h-full w-full object-contain',

  contentContainer: (layout: 'horizontal' | 'vertical') =>
    `${layout === 'horizontal' ? '' : 'flex flex-col justify-between'}`,

  title:
    'text-[length:var(--body-small-font-size)] font-[var(--font-semibold)] line-clamp-1 break-words',
  distance: 'text-[length:var(--text-xs)] text-[var(--text-secondary)]',
  timeLeft: 'text-[length:var(--text-xs)] text-[var(--text-secondary)]',
  priceLabel: 'text-[length:var(--text-xs)] text-[var(--text-disabled)]',
  price: 'text-[length:var(--body-small-font-size)] font-[var(--font-bold)]',
  location: 'text-[length:var(--text-xs)] text-pink-500',
};
