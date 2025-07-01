'use client';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';

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
      className="absolute inset-0 z-10 bg-black/50"
      style={{ pointerEvents: isCanClose ? 'auto' : 'none' }}
      onClick={isCanClose ? () => setVisible(false) : undefined}
      onTouchStart={isCanClose ? () => setVisible(false) : undefined}
    >
      {/* 닫기 버튼 */}
      {isCanClose && (
        <IoMdClose
          className="absolute right-4 top-4 z-20 flex h-8 w-8 text-xl font-bold text-white"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <p className="text-lg font-bold">{overlayText}</p>
      </div>
    </div>
  );
};
