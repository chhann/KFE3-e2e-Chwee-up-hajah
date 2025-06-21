'use client';
import { useState } from 'react';

const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const addDays = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0] as string;
};

export const AuctionDateSelector = () => {
  const today = getToday();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // 종료일은 시작일~시작일+5까지만 허용 (당일만 선택도 가능)
  const minEndDate = startDate;
  const maxEndDate = startDate ? addDays(startDate, 5) : '';

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
            const safeEndDate = endDate as string;
            if (safeEndDate < newStart) {
              setEndDate(newStart);
            } else if (safeEndDate > addDays(newStart, 5)) {
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
