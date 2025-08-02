import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

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
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>,
  minPrice?: number,
  bidCount?: number
) => {
  const value = e.target.value;
  if (/[^0-9]/.test(value)) {
    toast.error('숫자만 입력할 수 있습니다.');
    return;
  }

  if (minPrice && bidCount && bidCount > 0 && Number(value) < minPrice) {
    toast.error(`시작가는 현재가(${minPrice.toLocaleString()}원)보다 낮을 수 없습니다.`);
    return;
  }

  setStartPrice(value);
  setFieldErrors((prev) => {
    const { startPrice, ...rest } = prev;
    return rest;
  });
};

export const handlePriceInput = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: (v: string) => void,
  field: string,
  setFieldErrors: Dispatch<SetStateAction<Record<string, string>>>
) => {
  const value = e.target.value;
  if (/[^0-9]/.test(value)) {
    toast.error('숫자만 입력할 수 있습니다.');
    return;
  }
  setValue(value);
  setFieldErrors((prev) => {
    const { [field]: removed, ...rest } = prev;
    return rest;
  });
};

export function handleImageChange(
  e: ChangeEvent<HTMLInputElement>,
  setFiles: Dispatch<SetStateAction<File[]>>
) {
  if (!e.target.files) return;
  const selectedFiles = Array.from(e.target.files);
  const allowed = ['image/jpeg', 'image/png'];
  const validFiles = selectedFiles.filter((f) => allowed.includes(f.type));
  if (validFiles.length < selectedFiles.length) {
    toast.error('jpg, png 파일만 업로드할 수 있습니다.');
  }

  if (validFiles.length > 0) {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...validFiles].filter(
        (file, index, self) =>
          index === self.findIndex((f) => f.name === file.name && f.size === file.size)
      );

      if (newFiles.length > 5) {
        toast.error('사진은 최대 5장까지 등록할 수 있습니다.');
        return newFiles.slice(0, 5);
      }
      return newFiles;
    });
  }
  e.target.value = '';
}
