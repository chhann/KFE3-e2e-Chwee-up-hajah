'use client';
import { Item, ItemContent, ItemTitle } from '@repo/ui/design-system/base-components/Item/index';

import { usePointsHistory } from '@/shared/api/client/point/usePointsHistory';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { pointsHistoryListStyles as styles } from '../styles/pointsHistory.styles';

import { format } from 'date-fns';
import { useState } from 'react';

export type PointHistoryData = {
  id: string;
  user_id: string;
  points_earned: number;
  earning_type: string;
  created_at: string;
};

type PointsFilterType = 'all' | 'earned' | 'deducted';

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  return {
    date: format(date, 'MM.dd'), // "07.21"
    time: format(date, 'HH:mm'), // "18:27" (24시간 형식)
    fullDateTime: format(date, 'MM.dd HH:mm'), // "07.21 18:27"
  };
};

const formatPoints = (points: number) => {
  const isPositive = points > 0;
  const formattedAmount = Math.abs(points).toLocaleString();
  return {
    sign: isPositive ? '+' : '-',
    amount: formattedAmount,
    color: isPositive ? styles.colors.positive : styles.colors.negative,
  };
};

export const PointsHistoryList = () => {
  const [filterType, setFilterType] = useState<PointsFilterType>('all');
  const { data: items = [], isLoading } = usePointsHistory(filterType);

  if (isLoading) {
    return (
      <div className={styles.loading.container}>
        <AiOutlineLoading3Quarters className={styles.loading.spinner} />
      </div>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="points-history-title">
      <h2 id="points-history-title" className={styles.title}>
        적립 내역
      </h2>

      <div className={styles.filterContainer}>
        <select
          name="listFilter"
          id="pointHistoryFilter"
          className={styles.filterSelect}
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value as PointsFilterType);
          }}
        >
          <option value="all">전체 보기</option>
          <option value="earned">적립</option>
          <option value="deducted">차감</option>
        </select>
      </div>

      {items.length === 0 ? (
        <p className={styles.emptyMessage}>내역이 없습니다.</p>
      ) : (
        <ul role="list" className={styles.listContainer}>
          {items.map((item: PointHistoryData, index: number) => {
            const { sign, amount, color } = formatPoints(item.points_earned);

            return (
              <div key={item.id} className={styles.itemWrapper}>
                <li role="listitem" className={styles.listItem}>
                  <h2 className={styles.itemTitle}>적립 내역</h2>
                  <Item className={styles.item.container}>
                    <ItemContent className={styles.item.content}>
                      <ItemTitle className={styles.item.titleWrapper}>
                        <span className={styles.item.titleLabel}>적립 내역 제목: </span>
                        <p className={styles.item.titleText}>{item['earning_type'] || '기타'}</p>
                        <div className={styles.item.dateContainer}>
                          <time
                            className={styles.item.dateTime}
                            dateTime={item['created_at'].replace(/\//g, '-')}
                          >
                            {formatDateTime(item['created_at']).fullDateTime}
                          </time>
                        </div>
                      </ItemTitle>
                      <div className={`${styles.item.pointsContainer} ${color}`}>
                        <span className={styles.item.pointsLabel}>적립된 포인트: </span>
                        <p className={styles.item.pointsAmount}>
                          {sign}
                          {amount}원
                        </p>
                      </div>
                    </ItemContent>
                  </Item>
                </li>
                {items.length - 1 > index && <hr className={styles.divider} aria-hidden="true" />}
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
};
