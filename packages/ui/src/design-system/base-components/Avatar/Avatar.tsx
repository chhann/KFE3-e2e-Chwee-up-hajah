'use client';

import { forwardRef } from 'react';
import { cn } from '../../../utils/cn'; // 클래스명 유틸리티 함수
import { AVATAR_SIZES, avatarStyle } from './Avatar.styles';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null; // null 허용
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  name?: string;
  onImageError?: () => void; // 이미지 로드 실패 시 콜백
}

// 크기별 스타일 상수

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', name, onImageError, className, ...props }, ref) => {
    // fallback URL 생성기
    const generateFallbackAvatar = (seedName: string) => {
      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seedName)}`;
    };

    // src 값 정리
    const cleanSrc = typeof src === 'string' && src.trim() !== '' ? src : undefined;
    const sizeConfig = AVATAR_SIZES[size];
    const fallbackSrc = generateFallbackAvatar(name || alt);

    return (
      <div
        ref={ref}
        className={cn(
          // 기본 스타일
          avatarStyle.avatarBasicStyle,
          // 보더 스타일 (디자인 시스템 컬러 사용)
          avatarStyle.avatarBorderStyle,
          // 크기
          sizeConfig.container,
          // 호버 효과 (상호작용 개선)
          avatarStyle.avatarHoverStyle,
          className
        )}
        {...props}
      >
        <img
          src={cleanSrc ?? fallbackSrc}
          alt={alt}
          width={sizeConfig.pixels}
          height={sizeConfig.pixels}
          className={avatarStyle.avatarImageStyle}
          // 이미지 최적화 설정
          sizes={`${sizeConfig.pixels}px`}
          onError={(e) => {
            e.currentTarget.onerror = null; // 무한 루프 방지
            e.currentTarget.src = fallbackSrc;
            onImageError?.();
          }}
        />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
