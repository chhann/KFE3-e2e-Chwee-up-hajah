export const Styles = {
  container: (className: string) =>
    `mb-[var(--spacing-1)] flex w-full items-center justify-between px-[var(--spacing-1)] ${className}`,
  titleContainer: 'flex items-center gap-[var(--spacing-1)]',
  title: 'text-[var(--text-secondary)] text-[length:var(--body-small-font-size)]',
  locationContainer: 'flex items-center gap-[var(--spacing-0_5)]',
  locationIcon: 'mt-[var(--spacing-px)] text-[length:var(--text-xs)] text-pink-500',
  locationText: 'text-[length:var(--text-xs)] text-[var(--text-tertiary)]',
  moreButton:
    'text-[var(--text-secondary)] cursor-pointer text-[length:var(--body-small-font-size)]',
};
