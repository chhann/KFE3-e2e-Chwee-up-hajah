'use client';

import React, { useRef } from 'react';

import { IoIosAddCircleOutline, IoMdCloseCircle } from 'react-icons/io';

import { useAuctionImage } from '@/hooks/useAuctionImage';

import { handleImageChange } from '../model/handlers';
import {
  AuctionImageUploaderContainerStyle,
  DelateButtonStyle,
  ImagePreviewContainerStyle,
  ImagePreviewStyle,
  ImageStyle,
  ImageUploaderIconStyle,
  ImageUploaderStyle,
} from './styles/AuctionImageUploader.styles';

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
    <div className={AuctionImageUploaderContainerStyle}>
      <div className={ImageUploaderStyle} onClick={handleImageClick}>
        <IoIosAddCircleOutline className={ImageUploaderIconStyle} />
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
      <div className={ImagePreviewContainerStyle}>
        {images.map((url, idx) => (
          <div key={idx} className={ImagePreviewStyle}>
            <img src={url} alt="미리보기" className={ImageStyle} />
            <button
              type="button"
              className={DelateButtonStyle}
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
