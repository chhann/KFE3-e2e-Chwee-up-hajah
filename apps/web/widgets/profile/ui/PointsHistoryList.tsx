'use client';
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemTitle,
} from '@repo/ui/design-system/base-components/Item/index';

import { pointsHistoryListStyles as styles } from '../styles/pointsHistory.styles';
import { usePointsHistory } from '@/shared/api/client/point/usePointsHistory';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { format } from 'date-fns';

export type PointHistoryData = {
  id: string;
  user_id: string;
  points_earned: number;
  earning_type: string;
  created_at: string;
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  return {
    date: format(date, 'MM.dd'), // "07.21"
    time: format(date, 'HH:mm'), // "18:27" (24시간 형식)
    fullDateTime: format(date, 'MM.dd HH:mm'), // "07.21 18:27"
  };
};

export const PointsHistoryList = () => {
  const { data: items = [], isLoading } = usePointsHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  return (
    <section aria-labelledby="points-history-title">
      <h2 id="points-history-title" className="sr-only">
        적립 내역
      </h2>

      {items.length === 0 ? (
        <p className={styles.emptyMessage}>적립 내역이 없습니다.</p>
      ) : (
        <ul role="list">
          {items.map((item: PointHistoryData) => (
            <>
              <li key={item.id} role="listitem">
                <h2 className="sr-only">적립 내역</h2>
                <Item>
                  <ItemContent className="flex items-center">
                    <ItemTitle className="flex-1 overflow-hidden">
                      <span className="sr-only">적립 내역 제목: </span>
                      <p className="truncate text-lg font-[600]">
                        {item['earning_type'] || '기타'}
                      </p>
                      <div>
                        <time
                          className="text-sm text-gray-500"
                          dateTime={item['created_at'].replace(/\//g, '-')}
                        >
                          {formatDateTime(item['created_at']).fullDateTime}
                        </time>
                      </div>
                    </ItemTitle>
                    <p className="text-primary-500 text-xl">
                      <span className="sr-only">적립된 포인트: </span>
                      <p className="font-[700]">+{item['points_earned'].toLocaleString()}원</p>
                    </p>
                  </ItemContent>
                </Item>
              </li>
              <hr className="my-2 border-neutral-400" aria-hidden="true" />
            </>
          ))}
        </ul>
      )}
    </section>
  );
};
