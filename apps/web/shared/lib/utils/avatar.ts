export const getCacheBustingUrl = (url?: string) => {
  if (!url) return undefined;
  return url + '?t=' + Date.now();
};
