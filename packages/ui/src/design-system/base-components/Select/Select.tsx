import React from 'react';
import {
  SelectBoxContainer,
  SelectBoxStyle,
  SelectIconStyle,
  SelectLabelStyle,
} from './Select.styles';

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
      {/*라벨*/}
      {label && (
        <label htmlFor={id} className={SelectLabelStyle}>
          {label}
        </label>
      )}

      {/*커스텀 셀렉트 박스*/}
      <div className={SelectBoxContainer}>
        <select className={SelectBoxStyle} id={id} value={value} onChange={onChange}>
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* 커스텀 화살표 아이콘 */}
        <svg
          className={SelectIconStyle}
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
