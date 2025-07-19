'use client';
import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { overlayStyle } from './styles/AuctionOverlay';

export const AuctionOverlay = ({
  overlayText,
  isCanClose,
  isFailed,
  auctionId,
}: {
  overlayText: string;
  isCanClose?: boolean;
  isFailed?: boolean;
  auctionId?: string;
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={overlayStyle.overlayContainerStyle}
      style={{ pointerEvents: isCanClose ? 'auto' : 'none' }}
      onClick={isCanClose ? () => setVisible(false) : undefined}
      onTouchStart={isCanClose ? () => setVisible(false) : undefined}
    >
      {/* 닫기 버튼 */}
      {isCanClose && (
        <IoMdClose
          className={overlayStyle.closeIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        />
      )}
      <div className={overlayStyle.overlayTextContainer}>
        <div className={overlayStyle.overlayTextStyle}>
          <p>{overlayText}</p>
        </div>
        {isFailed && (
          <Link href={`/auction/${auctionId}/auction-edit`}>
            <Button variants="primary" size="lg">
              수정하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
