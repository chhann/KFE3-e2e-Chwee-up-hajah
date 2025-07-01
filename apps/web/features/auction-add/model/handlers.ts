import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { UseMutationResult } from '@tanstack/react-query';

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: (v: string) => void,
  field: string,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  setValue(e.target.value);
  setFieldErrors((prev) => {
    const { [field]: removed, ...rest } = prev;
    return rest;
  });
};

export const handleTextareaChange = (
  e: ChangeEvent<HTMLTextAreaElement>,
  setValue: (v: string) => void,
  field: string,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  setValue(e.target.value);
  setFieldErrors((prev) => {
    const { [field]: removed, ...rest } = prev;
    return rest;
  });
};

export const handleSelectChange = (
  e: ChangeEvent<HTMLSelectElement>,
  setValue: (v: string) => void,
  field: string,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  setValue(e.target.value);
  setFieldErrors((prev) => {
    const { [field]: removed, ...rest } = prev;
    return rest;
  });
};

export const handleDateChange = (
  value: string,
  setValue: (v: string) => void,
  field: string,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  setValue(value);
  setFieldErrors((prev) => {
    const { [field]: removed, ...rest } = prev;
    return rest;
  });
};

export const handleStartPriceInput = (
  e: ChangeEvent<HTMLInputElement>,
  setStartPrice: (v: string) => void,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  const value = e.target.value;
  if (/[^0-9]/.test(value)) {
    alert('숫자만 입력할 수 있습니다.');
    return;
  }
  setStartPrice(value);
  setFieldErrors((prev) => {
    const { startPrice, ...rest } = prev;
    return rest;
  });
};

export async function handleImageChange(
  e: ChangeEvent<HTMLInputElement>,
  images: string[],
  setImages: (urls: string[]) => void,
  auctionImageMutation: UseMutationResult<string, Error, File>
) {
  if (!e.target.files) return;
  const selectedFiles = Array.from(e.target.files);
  const allowed = ['image/jpeg', 'image/png'];
  const validFiles = selectedFiles.filter((f) => allowed.includes(f.type));
  if (validFiles.length < selectedFiles.length) {
    alert('jpg, png 파일만 업로드할 수 있습니다.');
  }
  let newUrls: string[] = [];
  for (const file of validFiles) {
    try {
      const url = await auctionImageMutation.mutateAsync(file);
      if (url && !images.includes(url) && !newUrls.includes(url)) {
        newUrls.push(url);
      }
    } catch (err) {
      // 에러 처리는 useAuctionImage에서 alert로 처리됨
      continue;
    }
  }
  const totalFiles = images.length + newUrls.length;
  if (totalFiles > 5) {
    alert('사진은 최대 5장까지 등록할 수 있습니다.');
    newUrls = newUrls.slice(0, 5 - images.length);
  }
  setImages([...images, ...newUrls].slice(0, 5));
  e.target.value = '';
}
