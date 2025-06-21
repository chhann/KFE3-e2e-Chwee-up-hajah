import React from 'react';

interface ProductDescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProductDescriptionInput = ({ value, onChange }: ProductDescriptionInputProps) => (
  <div>
    <label
      htmlFor="auctionDescription"
      className="mb-2 block text-sm font-medium text-[var(--color-neutral-70)]"
    >
      상품 정보
    </label>
    <textarea
      name="auctionDescription"
      id="auctionDescription"
      className="min-h-[120px] w-full flex-1 resize-none appearance-none rounded-lg border border-[var(--color-neutral-30)] bg-[var(--color-neutral-0)] px-3 py-2 text-[var(--color-neutral-80)] placeholder-[var(--color-neutral-80)] outline-none focus:text-[var(--color-primary-800)] focus:ring-1 focus:ring-[var(--color-primary-800)]"
      value={value}
      onChange={onChange}
    />
  </div>
);
