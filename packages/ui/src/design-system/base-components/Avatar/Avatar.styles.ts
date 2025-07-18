export const AVATAR_SIZES = {
  sm: {
    container: 'size-6', // w-6 h-6 → size-6 (Tailwind v4)
    pixels: 24,
  },
  md: {
    container: 'size-8',
    pixels: 32,
  },
  lg: {
    container: 'size-11',
    pixels: 44,
  },
  xl: {
    container: 'size-12',
    pixels: 48,
  },
  xxl: {
    container: 'size-18',
    pixels: 72,
  },
} as const;
export const avatarStyle = {
  avatarBasicStyle: 'relative inline-flex shrink-0 overflow-hidden rounded-full',
  avatarBorderStyle: 'border border-primary-200',
  avatarHoverStyle: 'transition-all duration-200 hover:border-primary-300',
  avatarImageStyle: 'size-full object-cover',
};
