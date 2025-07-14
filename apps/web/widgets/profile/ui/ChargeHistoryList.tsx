import { Item, ItemContent, ItemFooter } from '@repo/ui/design-system/base-components/Item/index';

import { chargeHistoryListStyles as styles } from '../styles/chargeHistory.styles';

export const ChargeHistoryList = () => {
  const items = [
    {
      id: 1,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
    {
      id: 2,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
    {
      id: 3,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
  ];

  return (
    <section aria-labelledby="charge-history-title">
      <h2 id="charge-history-title" className="sr-only">
        충전 내역
      </h2>

      {items.length === 0 ? (
        <p className={styles.emptyMessage}>충전 내역이 없습니다.</p>
      ) : (
        <ul role="list" className={styles.listContainer}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem} role="listitem">
              <h2 className="sr-only">충전 내역</h2>
              <Item className={styles.item.wrapper}>
                <ItemContent>
                  <time dateTime={item.date.replace(/\//g, '-')} className={styles.item.date}>
                    {item.date}
                  </time>
                  <p className={styles.item.price}>
                    <span className="sr-only">충전 금액: </span>
                    {item.price.toLocaleString()}원
                  </p>
                </ItemContent>
                <ItemFooter>
                  <p className={styles.item.paymentInfo}>
                    <span className="sr-only">결제 수단: </span>
                    결제정보: {item.paymentInfo}
                  </p>
                </ItemFooter>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
