import React from 'react';
import {
  ProductDescriptionLabelStyle,
  ProductDescriptionTextareaStyle,
} from './styles/ProductDescriptionInput.styles';

interface ProductDescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProductDescriptionInput = ({ value, onChange }: ProductDescriptionInputProps) => (
  <div>
    <label htmlFor="auctionDescription" className={ProductDescriptionLabelStyle}>
      상품 정보
    </label>
    <textarea
      name="auctionDescription"
      id="auctionDescription"
      className={ProductDescriptionTextareaStyle}
      value={value}
      onChange={onChange}
    />
  </div>
);
