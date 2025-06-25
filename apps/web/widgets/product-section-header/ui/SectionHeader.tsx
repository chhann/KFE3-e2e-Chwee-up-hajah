'use client';

import { FaLocationDot } from 'react-icons/fa6';

interface SectionHeaderProps {
  title: string;
  location?: string;
  onClickMore: () => void;
  className?: string; // ✅ 외부 스타일 커스터마이징
}

export const SectionHeader = ({
  title,
  location,
  onClickMore,
  className = '', // 기본값 빈 문자열
}: SectionHeaderProps) => {
  return (
    <div className={`mb-[5px] flex w-full items-center justify-between px-1 ${className}`}>
      <div className="flex items-center gap-1">
        {/* 제목 */}
        <span className="text-neutral-70 text-sm">{title}</span>
        {/* 장소 지도위 헤더에만 */}
        {location && (
          <div className="flex items-center gap-[2px]">
            <FaLocationDot className="mt-[1px] text-xs text-pink-500" />
            <span className="text-xs text-neutral-500">{location}</span>
          </div>
        )}
      </div>
      {/* 더보기 네비게이션 */}
      <button onClick={onClickMore} className="text-neutral-70 cursor-pointer text-sm">
        더보기
      </button>
    </div>
  );
};
