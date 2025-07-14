import React from 'react';
import { selectStyle } from './Select.styles';

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
        <label htmlFor={id} className={selectStyle.selectLabelStyle}>
          {label}
        </label>
      )}

      {/*커스텀 셀렉트 박스*/}
      <div className={selectStyle.selectBoxContainer}>
        <select className={selectStyle.selectBoxStyle} id={id} value={value} onChange={onChange}>
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* 커스텀 화살표 아이콘 */}
        <svg
          className={selectStyle.selectIconStyle}
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
