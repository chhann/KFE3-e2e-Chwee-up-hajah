'use client';

import React, { useRef } from 'react';

import { CirclePlus, CircleX } from 'lucide-react';

import { useAuctionImage } from '@/shared/api/client/auction/useAuctionImage';

import { handleImageChange } from '../model/handlers';

import { auctionImageUploaderStyle } from './styles/AuctionImageUploader.styles';

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
    <div className={auctionImageUploaderStyle.auctionImageUploaderContainerStyle}>
      <div className={auctionImageUploaderStyle.imageUploaderStyle} onClick={handleImageClick}>
        <CirclePlus className={auctionImageUploaderStyle.imageUploaderIconStyle} />
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
      <div className={auctionImageUploaderStyle.imagePreviewContainerStyle}>
        {images.map((url, idx) => (
          <div key={idx} className={auctionImageUploaderStyle.imagePreviewStyle}>
            <img src={url} alt="미리보기" className={auctionImageUploaderStyle.imageStyle} />
            <button
              type="button"
              className={auctionImageUploaderStyle.delateButtonStyle}
              onClick={() => handleRemoveImage(idx)}
              tabIndex={-1}
            >
              <CircleX size={24} fill="white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
