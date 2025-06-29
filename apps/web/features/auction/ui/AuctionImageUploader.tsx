'use client';

import React, { useRef } from 'react';

import { IoIosAddCircleOutline, IoMdCloseCircle } from 'react-icons/io';

import { supabase } from '@/lib/supabase/supabase';

interface AuctionImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AuctionImageUploader: React.FC<AuctionImageUploaderProps> = ({
  images,
  setImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (images.length >= 5) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    // 확장자 필터링(jpg, jpeg, png)
    const allowed = ['image/jpeg', 'image/png'];
    const validFiles = selectedFiles.filter((f) => allowed.includes(f.type));
    if (validFiles.length < selectedFiles.length) {
      alert('jpg, png 파일만 업로드할 수 있습니다.');
    }
    // 중복 url 방지 (업로드 후 url로 비교)
    let newUrls: string[] = [];
    for (const file of validFiles) {
      // Supabase Storage 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('auction-image')
        .upload(fileName, file, { upsert: false });
      if (error) {
        alert('이미지 업로드 실패' + error.message);
        continue;
      }
      const { data: urlData } = supabase.storage.from('auction-image').getPublicUrl(data.path);
      if (
        urlData?.publicUrl &&
        !images.includes(urlData.publicUrl) &&
        !newUrls.includes(urlData.publicUrl)
      ) {
        newUrls.push(urlData.publicUrl);
      }
    }
    const totalFiles = images.length + newUrls.length;
    if (totalFiles > 5) {
      alert('사진은 최대 5장까지 등록할 수 있습니다.');
      newUrls = newUrls.slice(0, 5 - images.length);
    }
    setImages((prev) => [...prev, ...newUrls].slice(0, 5));
    e.target.value = '';
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
          onChange={handleImageChange}
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
