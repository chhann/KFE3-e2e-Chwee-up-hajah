import React from 'react';

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  id?: string;
}

const Select = ({ label, value, onChange, options, id = 'custom-select' }: SelectProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-[var(--color-neutral-70)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full flex-1 appearance-none rounded-lg border border-[var(--color-neutral-30)] bg-[var(--color-neutral-0)] px-3 py-2 text-[var(--color-neutral-80)] placeholder-[var(--color-neutral-80)] outline-none focus:text-[var(--color-primary-800)] focus:ring-1 focus:ring-[var(--color-primary-800)]`}
          id={id}
          value={value}
          onChange={onChange}
        >
          <option value="" disabled hidden></option>
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

export default Select;
