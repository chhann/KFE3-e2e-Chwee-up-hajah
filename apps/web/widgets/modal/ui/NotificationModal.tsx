'use client';

import { useRouter } from 'next/navigation';
import { RiAuctionLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { ItemBadge } from '@repo/ui/design-system/base-components/Item/index';
import {
  Modal,
  ModalContent,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';

import { useModalStore } from '../../../shared/stores/modal';
import { useNotificationList } from '@/shared/api/client/notification/useNotificationList';
import { NotificationItem } from '@/shared/types/notification';

import { NotificationModalItem } from './NotificationModalItem';
import { notificationModalStyles as styles } from '../styles/notificationModal.styles';

const NotificationModal = () => {
  const router = useRouter();
  const { isModalOpen, closeModal } = useModalStore();
  const { data: items, isLoading } = useNotificationList(isModalOpen('notification'));

  if (!isModalOpen('notification')) return null;

  return (
    <Modal className={styles.modal}>
      <ModalContent className={styles.content}>
        <ModalHeader title="알림" onClose={closeModal} />
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        ) : (
          <>
            {items.length === 0 && <p className={styles.emptyMessage}>알림 내역이 없습니다.</p>}
            <div>
              <ItemBadge className={styles.sectionBadge}>
                <span className={styles.sectionIcon}>
                  <RiAuctionLine className="mr-1 size-5" />
                </span>
                <h3>{items.length}개의 경매가 있습니다.</h3>
              </ItemBadge>

              {items.map((item: NotificationItem) => (
                <div
                  key={item['notification_id']}
                  onClick={() => {
                    router.push(`/auction/${item['auction_id']}/auction-detail`);
                    closeModal();
                  }}
                >
                  <NotificationModalItem item={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
