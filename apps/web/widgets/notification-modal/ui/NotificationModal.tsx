import { Button } from '@repo/ui/design-system/base-components/Button/index';

import { IoMdClose } from 'react-icons/io';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { RiAuctionLine } from 'react-icons/ri';

import { NotificationListItem } from './NotificationListItem';
import { NotificationSection } from './NotificationSection';

export const NotificationModal = ({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) => {
  return (
    <>
      <dialog ref={dialogRef} className="m-auto rounded-[10px] backdrop:backdrop-blur-sm">
        <div className="z-80 mx-auto h-[550px] w-[320px] overflow-hidden rounded-[10px] pt-4">
          <header className="mb-4 flex items-center justify-between px-4">
            <h2 id="notification-title" className="text-lg font-semibold text-gray-900">
              알림
            </h2>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200"
              aria-label="알림창 닫기"
              autoFocus
              onClick={() => dialogRef.current?.close()}
            >
              <IoMdClose className="size-5" />
            </button>
          </header>

          <div className="border-1 mb-4 border-[var(--color-neutral-20)]" />

          {/* 알림 내용 */}
          <div
            id="notification-description"
            className="h-[450px] overflow-y-auto px-[14px] pb-[14px]"
            role="main"
          >
            <NotificationSection icon={IoAlertCircleOutline} title="1개의 알림이 있습니다.">
              <NotificationListItem
                title="빈티지 시계 - 한정판"
                description="안녕하세요. 어제 입찰되었다고 떴는데 이후에 연락이 없으셔서요."
                time="2025/05/21 14:33PM"
                ariaLabel="빈티지 시계 채팅 알림 보기"
              />
            </NotificationSection>

            <NotificationSection icon={RiAuctionLine} title="2개의 경매 알림이 있습니다.">
              <NotificationListItem
                title="빈티지 시계 - 한정판"
                description="경매가 종료되었습니다."
                time="2025/05/21 14:33PM"
                price="55,000원"
                ariaLabel="빈티지 시계 경매 종료 알림 보기"
              />
              <NotificationListItem
                title="나이키 한정판 운동화 돈 주고도 못사는데 내가 해드림."
                description="경매가 종료되었습니다."
                time="2025/05/21 14:33PM"
                price="155,000원"
                ariaLabel="나이키 한정판 운동화 경매 종료 알림 보기"
              />
            </NotificationSection>

            {/* 빈 상태 예시 (데이터 없을 때) */}
            {/* {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <IoAlertCircleOutline className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">알림이 없습니다</h3>
                <p className="text-gray-500">새로운 알림이 오면 여기에 표시됩니다</p>
              </div>
            )} */}
          </div>
        </div>
      </dialog>
    </>
  );
};
