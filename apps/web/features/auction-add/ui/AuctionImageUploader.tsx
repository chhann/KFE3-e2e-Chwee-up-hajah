'use client';

import React, { useEffect, useRef, useState } from 'react';

import { CirclePlus, CircleX } from 'lucide-react';
import Image from 'next/image';

import { handleImageChange } from '../model/handlers';

import { auctionImageUploaderStyle } from './styles/AuctionImageUploader.styles';

interface AuctionImageUploaderProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const AuctionImageUploader: React.FC<AuctionImageUploaderProps> = ({ files, setFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(newImagePreviews);

    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleImageClick = () => {
    if (files.length >= 5) return;
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
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
          onChange={(e) => handleImageChange(e, setFiles)}
          disabled={files.length >= 5}
        />
      </div>
      {/* 미리보기 썸네일 */}
      <div className={auctionImageUploaderStyle.imagePreviewContainerStyle}>
        {imagePreviews.map((url, idx) => (
          <div key={idx} className={auctionImageUploaderStyle.imagePreviewStyle}>
            <Image
              src={url}
              alt="미리보기"
              fill
              className={auctionImageUploaderStyle.imageStyle}
              sizes="90"
            />
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
