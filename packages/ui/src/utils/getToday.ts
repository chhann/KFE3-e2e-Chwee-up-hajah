export const getToday = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0] as string;
};
