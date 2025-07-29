export const Styles = {
  container: (className: string) =>
    `mb-[var(--spacing-1)] w-full items-center px-[var(--spacing-1)] ${className}`,
  titleContainer: 'flex items-center gap-[var(--spacing-1)]',
  title: 'text-[#484848] text-[length:var(--body-large-font-size)] font-[var(--font-bold)]',
  subTitle: 'text-[var(--text-tertiary)] text-[length:var(--body-small-font-size)]',
  locationContainer: 'flex items-center gap-[var(--spacing-0_5)]',
  locationIcon: 'mt-[var(--spacing-px)] text-[length:var(--text-xs)] text-pink-500',
  locationText: 'text-[length:var(--text-xs)] text-[var(--text-tertiary)]',
  moreButton:
    'text-[var(--text-secondary)] cursor-pointer text-[length:var(--body-small-font-size)]',
};
