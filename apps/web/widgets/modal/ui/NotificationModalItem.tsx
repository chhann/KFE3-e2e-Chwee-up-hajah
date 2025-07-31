import { useEffect, useState } from 'react';

import {
  Item,
  ItemContent,
  ItemFooter,
  ItemTitle,
} from '@repo/ui/design-system/base-components/Item/index';

import { NotificationItem } from '@/shared/types/notification';

import { notificationModalStyles as styles } from '../styles/notificationModal.styles';

interface NotificationModalItemProps {
  item: NotificationItem;
}

export const NotificationModalItem = ({ item }: NotificationModalItemProps) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    setFormattedDate(formatDate(item.sent_at));
  }, [item.sent_at]);

  const getPriceInfo = (item: NotificationItem) => {
    switch (item.type) {
      case 'auction_outbid':
        return {
          label: '현재 최고가',
          amount: item.data.bid_amount,
        };
      case 'auction_won':
        return {
          label: '낙찰가',
          amount: item.data.winning_bid,
        };
      case 'auction_lost':
        return {
          label: '최종 낙찰가',
          amount: item.data.final_bid,
        };
      case 'auction_no_bid':
        return null;
      default:
        return null;
    }
  };

  const priceInfo = getPriceInfo(item);

  return (
    <Item className={styles.notificationItem}>
      <ItemTitle className={styles.itemTitle}>{item.data['product_name']}</ItemTitle>
      <ItemContent className={styles.itemContent}>{item.title}</ItemContent>
      <ItemFooter className={styles.itemFooter}>
        {priceInfo && (
          <div className="flex flex-1 items-end">
            <span className={styles.price.label}>{priceInfo.label}</span>
            <strong className={styles.price.amount}>{priceInfo.amount.toLocaleString()}원</strong>
          </div>
        )}

        {formattedDate && <p className={styles.timestamp}>{formattedDate}</p>}
      </ItemFooter>
    </Item>
  );
};
