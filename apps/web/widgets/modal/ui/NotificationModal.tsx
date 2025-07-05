'use client';

import {
  Item,
  ItemBadge,
  ItemContent,
  ItemFooter,
  ItemTitle,
} from '@repo/ui/design-system/base-components/Item/index';
import {
  Modal,
  ModalContent,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { RiAuctionLine } from 'react-icons/ri';

import { NotificationSection } from '@/shared/types/modal';
import { useModalStore } from '../../../shared/stores/modal';

import { notificationModalStyles as styles } from '../styles/notificationModal.styles';

export const NotificationModal = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen('notification')) return null;

  const sections: NotificationSection[] = [
    {
      icon: <IoAlertCircleOutline className="mr-1 size-5" />,
      title: '2개의 알림이 있습니다.',
      items: [
        {
          id: '1',
          title: '빈티지 시계 - 한정판',
          content: '안녕하세요 저는 입찰자인데요 이후 과정이 어떻게 되는지 궁금하네요.',
          price: 120000,
          misc: '2025/05/23 13:00 PM',
        },
        {
          id: '2',
          title: '빈티지 시계 - 한정판',
          content: '안녕하세요 저는 입찰자인데요 이후 과정이 어떻게 되는지 궁금하네요.',
          price: 120000,
          misc: '2025/05/23 13:00 PM',
        },
      ],
    },
    {
      icon: <RiAuctionLine className="mr-1 size-5" />,
      title: '1개의 경매가 있습니다.',
      items: [
        {
          id: '3',
          title: '빈티지 시계 - 한정판',
          content: '경매가 종료되었습니다. 낙찰가를 확인하세요.',
          misc: '2025/05/23 13:00 PM',
        },
      ],
    },
  ];

  return (
    <Modal className={styles.modal}>
      <ModalContent className={styles.content}>
        <ModalHeader title="알림" onClose={closeModal} />
        {sections.length === 0 && <p className={styles.emptyMessage}>알림 내역이 없습니다.</p>}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <ItemBadge className={styles.sectionBadge}>
              <span className={styles.sectionIcon}>{section.icon}</span>
              <h3>{section.title}</h3>
            </ItemBadge>

            {section.items.map((item) => (
              <Item key={item.id} className={styles.notificationItem}>
                <ItemTitle className={styles.itemTitle}>{item.title}</ItemTitle>
                <ItemContent className={styles.itemContent}>{item.content}</ItemContent>
                <ItemFooter className={styles.itemFooter}>
                  {item.price && (
                    <div>
                      <span className={styles.price.label}>낙찰가</span>
                      <strong className={styles.price.amount}>
                        {item.price.toLocaleString()}원
                      </strong>
                    </div>
                  )}
                  <p className={styles.timestamp}>{item.misc}</p>
                </ItemFooter>
              </Item>
            ))}
          </div>
        ))}
      </ModalContent>
    </Modal>
  );
};
