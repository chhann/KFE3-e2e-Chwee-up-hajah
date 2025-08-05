'use client';

import { Check, ChevronRight } from 'lucide-react';

export interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetailClick?: () => void; // 약관 상세보기 '>') 버튼을 위한 클릭 핸들러
  isEmphasized?: boolean; // '전체 동의' 같은 강조 텍스트를 위함
}

export const CustomCheckbox = ({
  id,
  label,
  checked,
  onChange,
  onDetailClick,
  isEmphasized = false,
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="flex cursor-pointer items-center">
        {/* 실제 input은 숨기고, peer로 사용해 상태를 관리합니다 (접근성 유지) */}
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        {/* 커스텀 체크박스 UI */}
        <div className="peer-checked:border-primary-600 peer-checked:bg-primary-600 relative flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300 bg-white transition-all">
          {/* [핵심 수정] CSS 투명도 대신, checked 상태에 따라 아이콘을 직접 렌더링합니다. */}
          {checked && <Check className="h-5 w-5 text-gray-400" />}
        </div>

        {/* 레이블 텍스트 */}
        <span
          className={`ml-3 text-sm ${
            isEmphasized ? 'font-bold text-gray-800' : 'font-medium text-gray-700'
          }`}
        >
          {label}
        </span>
      </label>

      {/* 상세보기 버튼 (필요한 경우에만 렌더링) */}
      {onDetailClick && (
        <button
          type="button"
          onClick={onDetailClick}
          className="text-gray-400 hover:text-gray-600"
          aria-label={`${label} 상세보기`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
