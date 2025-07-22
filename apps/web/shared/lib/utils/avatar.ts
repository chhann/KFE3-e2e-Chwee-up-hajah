export const getCacheBustingUrl = (url?: string) => {
  if (!url) return '';
  return url + '?t=' + Date.now();
};
