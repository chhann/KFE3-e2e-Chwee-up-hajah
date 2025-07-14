'use client';

import { forwardRef } from 'react';
import { cn } from '../../../utils/cn'; // 클래스명 유틸리티 함수
import { AVATAR_SIZES, avatarStyle } from './Avatar.styles';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string; // 프로필 이미지 URL
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'; // 아바타 크기
  name?: string;
  onImageError?: () => void; // 이미지 로드 실패 시 콜백
}

// 크기별 스타일 상수

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', name, onImageError, className, ...props }, ref) => {
    // Fallback 아바타 생성 함수
    const generateFallbackAvatar = (seedName: string) => {
      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seedName)}`;
    };

    // 이미지 소스 결정
    const imageSrc = src || generateFallbackAvatar(name || alt);
    const sizeConfig = AVATAR_SIZES[size];

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
          src={imageSrc}
          alt={alt}
          width={sizeConfig.pixels}
          height={sizeConfig.pixels}
          className={avatarStyle.avatarImageStyle}
          onError={onImageError}
          // 이미지 최적화 설정
          sizes={`${sizeConfig.pixels}px`}
        />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
