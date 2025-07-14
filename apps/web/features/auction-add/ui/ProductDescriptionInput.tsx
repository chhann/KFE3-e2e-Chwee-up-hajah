import React from 'react';
import { productDescriptionStyle } from './styles/ProductDescriptionInput.styles';

interface ProductDescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProductDescriptionInput = ({ value, onChange }: ProductDescriptionInputProps) => (
  <div>
    <label
      htmlFor="auctionDescription"
      className={productDescriptionStyle.productDescriptionLabelStyle}
    >
      상품 정보
    </label>
    <textarea
      name="auctionDescription"
      id="auctionDescription"
      className={productDescriptionStyle.productDescriptionTextareaStyle}
      value={value}
      onChange={onChange}
    />
  </div>
);
