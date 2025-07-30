export const Styles = {
  container: `overflow-hidden rounded-[var(--radius-lg)] bg-[#F4F4F7] flex h-[270px] w-[250px] flex-col p-[var(--spacing-2)]`,

  imageContainer: `mb-[var(--spacing-2)] h-[120px] w-full flex-shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[#F4F4F7]`,
  image: 'object-cover',

  contentContainer: `flex flex-col justify-between flex-grow`,

  title:
    'text-[length:var(--body-small-font-size)] font-[var(--font-semibold)] line-clamp-1 break-words',
  distance: 'text-[length:var(--text-xs)] text-[var(--text-secondary)]',
  timeLeft: 'text-[length:var(--text-xs)] text-[var(--text-secondary)]',
  priceLabel: 'text-[length:var(--text-sm)] text-[#F03F94] mr-[2px]',
  price: 'text-[length:var(--body-small-font-size)] font-[var(--font-bold)] text-[#F03F94]',
};
