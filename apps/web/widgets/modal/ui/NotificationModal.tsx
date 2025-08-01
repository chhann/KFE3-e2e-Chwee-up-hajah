'use client';

import { ItemBadge } from '@repo/ui/design-system/base-components/Item/index';
import {
  Modal,
  ModalContent,
  ModalHeader,
} from '@repo/ui/design-system/base-components/Modal/index';
import { Hammer } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { LoadingSpinner } from '@/widgets/loading-spiner';
import { NotificationSettings } from '@/widgets/profile/ui/NotificationSettings';

import { useNotificationList } from '@/shared/api/client/notification/useNotificationList';
import { useModalStore } from '@/shared/stores/modal';
import { NotificationItem } from '@/shared/types/notification';

import { notificationModalStyles } from '../styles/notificationModal.styles';

import { NotificationModalItem } from './NotificationModalItem';

const NotificationModal = () => {
  const router = useRouter();
  const { closeModal } = useModalStore();
  const { data: items = [], isLoading } = useNotificationList(true);

  return (
    <Modal className={notificationModalStyles.modal}>
      <ModalContent className={notificationModalStyles.content}>
        <ModalHeader title="알림" onClose={closeModal} />
        <NotificationSettings />
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <p className={notificationModalStyles.emptyMessage}>알림 내역이 없습니다.</p>
            ) : (
              <>
                <ItemBadge className={notificationModalStyles.sectionBadge}>
                  <span className={notificationModalStyles.sectionIcon}>
                    <Hammer className="mr-1 size-5" />
                  </span>
                  <h3>
                    {items.filter((item) => item.auction_id).length}개의 경매 알림이 있습니다.
                  </h3>
                </ItemBadge>

                {items.map((item: NotificationItem) => (
                  <>
                    <div
                      key={item.notification_id}
                      className={notificationModalStyles.notificationItemWrapper}
                      onClick={() => {
                        closeModal();
                        if (item.auction_id) {
                          router.push(`/auction/${item.auction_id}/auction-detail`);
                        } else if (item.room_id) {
                          router.push(`/chat/${item.room_id}`);
                        }
                      }}
                    >
                      <NotificationModalItem item={item} />
                    </div>
                  </>
                ))}
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
