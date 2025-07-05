'use client';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { overlayStyle } from './styles/AuctionOverlay';

export const AuctionOverlay = ({
  overlayText,
  isCanClose,
}: {
  overlayText: string;
  isCanClose?: boolean;
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
      <div className={overlayStyle.overlayTextStyle}>
        <p>{overlayText}</p>
      </div>
    </div>
  );
};
