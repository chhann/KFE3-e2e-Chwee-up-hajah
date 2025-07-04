'use client';

import { getToday } from '@repo/ui/utils/getToday';
import {
  AuctionDateSelectorContainerStyle,
  AuctionDateSelectorInputStyle,
  AuctionDateSelectorLabelStyle,
  AuctionStartDateSelectorContainerStyle,
} from './styles/AuctionDateSelector.styles';
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
    <div className={AuctionDateSelectorContainerStyle}>
      <div className={AuctionStartDateSelectorContainerStyle}>
        <label className={AuctionDateSelectorLabelStyle}>경매 시작일</label>
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
          className={AuctionDateSelectorInputStyle}
        />
      </div>
      <div className={AuctionStartDateSelectorContainerStyle}>
        <label className={AuctionDateSelectorLabelStyle}>경매 종료일</label>
        <input
          type="date"
          min={minEndDate}
          max={maxEndDate}
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className={AuctionDateSelectorInputStyle}
        />
      </div>
    </div>
  );
};
