// auction-add-page/model/handlers.ts

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

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
