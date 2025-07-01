'use client';

import React, { useRef } from 'react';

import { IoIosAddCircleOutline, IoMdCloseCircle } from 'react-icons/io';

import { useAuctionImage } from '@/hooks/useAuctionImage';

import { handleImageChange } from '../model/handlers';

interface AuctionImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AuctionImageUploader: React.FC<AuctionImageUploaderProps> = ({
  images,
  setImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageMutation = useAuctionImage();
  const handleImageClick = () => {
    if (images.length >= 5) return;
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="mb-1 flex items-start gap-2">
      <div
        className="w-30 h-30 border-neutral-40 flex shrink-0 cursor-pointer items-center justify-center rounded-md border"
        onClick={handleImageClick}
      >
        <IoIosAddCircleOutline className="text-neutral-40" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => handleImageChange(e, images, setImages, imageMutation)}
          disabled={images.length >= 5}
        />
      </div>
      {/* 미리보기 썸네일 */}
      <div className="flex max-w-[210px] flex-nowrap gap-2 overflow-x-auto">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="w-30 h-30 border-neutral-40 relative shrink-0 overflow-hidden rounded border"
          >
            <img src={url} alt="미리보기" className="h-full w-full object-cover" />
            <button
              type="button"
              className="absolute right-0 top-0"
              onClick={() => handleRemoveImage(idx)}
              tabIndex={-1}
            >
              <IoMdCloseCircle size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
