import React from 'react';

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  id = 'custom-select',
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-[var(--color-neutral-70)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--color-red-500)]">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full flex-1 appearance-none rounded-lg border border-[var(--color-neutral-30)] bg-[var(--color-neutral-0)] px-3 py-2 text-[var(--color-neutral-80)] placeholder-[var(--color-neutral-80)] outline-none focus:text-[var(--color-primary-800)] focus:ring-1 focus:ring-[var(--color-primary-800)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-20)]`}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            카테고리를 선택하세요
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* 커스텀 화살표 아이콘 */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-neutral-60)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
