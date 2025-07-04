'use client';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { CloseIconStyle, OverlayContainerStyle, OverlayTextStyle } from './style/AuctionOverlay';

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
      className={OverlayContainerStyle}
      style={{ pointerEvents: isCanClose ? 'auto' : 'none' }}
      onClick={isCanClose ? () => setVisible(false) : undefined}
      onTouchStart={isCanClose ? () => setVisible(false) : undefined}
    >
      {/* 닫기 버튼 */}
      {isCanClose && (
        <IoMdClose
          className={CloseIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        />
      )}
      <div className={OverlayTextStyle}>
        <p>{overlayText}</p>
      </div>
    </div>
  );
};
