'use client';

import { Styles } from './styles/section-header.styles';

interface SectionHeaderProps {
  title: string;
  subTitle?: string; // ✅ 서브 제목 추가
  className?: string; // ✅ 외부 스타일 커스터마이징
}

export const SectionHeader = ({
  title,
  subTitle,
  className = '', // 기본값 빈 문자열
}: SectionHeaderProps) => {
  return (
    <div className={Styles.container(className)}>
      <div className={Styles.titleContainer}>
        {/* 제목 */}
        <span className={Styles.title}>{title}</span>
      </div>
      <div>
        <span className={Styles.subTitle}>{subTitle}</span>
      </div>
    </div>
  );
};
