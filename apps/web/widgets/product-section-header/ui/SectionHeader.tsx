'use client';

import { FaLocationDot } from 'react-icons/fa6';
import { Styles } from './styles/section-header.styles';

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
    <div className={Styles.container(className)}>
      <div className={Styles.titleContainer}>
        {/* 제목 */}
        <span className={Styles.title}>{title}</span>
        {/* 장소 지도위 헤더에만 */}
        {location && (
          <div className={Styles.locationContainer}>
            <FaLocationDot className={Styles.locationIcon} />
            <span className={Styles.locationText}>{location}</span>
          </div>
        )}
      </div>
      {/* 더보기 네비게이션 */}
      <button onClick={onClickMore} className={Styles.moreButton}>
        더보기
      </button>
    </div>
  );
};
