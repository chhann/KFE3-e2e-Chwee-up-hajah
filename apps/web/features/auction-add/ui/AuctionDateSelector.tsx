'use client';

import { getToday } from '@repo/ui/utils/getToday';
interface AuctionDateSelectorProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export const AuctionDateSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: AuctionDateSelectorProps) => {
  const addDays = (dateStr: string, days: number): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0] as string;
  };

  const today = getToday();
  // baseDate는 항상 string이 되도록 보장
  const baseDate = startDate;
  const minEndDate = baseDate;
  const maxEndDate = addDays(baseDate, 5);

  return (
    <div className="flex gap-4">
      <div className="flex w-1/2 flex-col">
        <label className="mb-1 text-sm font-medium">경매 시작일</label>
        <input
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => {
            const newStart = e.target.value;
            setStartDate(newStart);
            if (endDate < newStart) {
              setEndDate(newStart);
            } else if (endDate > addDays(newStart, 5)) {
              setEndDate(addDays(newStart, 5));
            }
          }}
          className="w-full flex-1 appearance-none rounded-lg border border-[var(--color-neutral-30)] bg-[var(--color-neutral-0)] px-3 py-2 text-left text-[var(--color-neutral-80)] focus:text-[var(--color-primary-800)] focus:ring-1 focus:ring-[var(--color-primary-800)]"
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <label className="mb-1 text-sm font-medium">경매 종료일</label>
        <input
          type="date"
          min={minEndDate}
          max={maxEndDate}
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className="w-full flex-1 appearance-none rounded-lg border border-[var(--color-neutral-30)] bg-[var(--color-neutral-0)] px-3 py-2 text-left text-[var(--color-neutral-80)] focus:text-[var(--color-primary-800)] focus:ring-1 focus:ring-[var(--color-primary-800)]"
        />
      </div>
    </div>
  );
};
