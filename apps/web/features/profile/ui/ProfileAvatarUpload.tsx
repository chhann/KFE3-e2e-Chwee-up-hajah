'use client';

import { useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { Camera } from 'lucide-react';

interface AvatarUploadProps {
  username: string;
  originalAvatarUrl?: string; // DB에 저장된 원본 아바타 URL
  previewAvatarUrl?: string; // ProfileForm에서 관리하는 현재 미리보기 URL
  onFileSelect: (file: File | undefined) => void; // 선택된 File 객체를 상위로 전달하는 콜백
}

export const ProfileAvatarUpload = ({
  username,
  originalAvatarUrl,
  previewAvatarUrl, // ProfileForm에서 이미 캐시 버스터가 붙어 전달된 URL 사용
  onFileSelect,
}: AvatarUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const imageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 선택된 파일을 상위 컴포넌트(ProfileForm)로 전달합니다.
      // 상위 컴포넌트가 이 파일을 가지고 미리보기 URL을 생성하고 상태를 업데이트
      onFileSelect(file);
    }
  };

  if (!previewAvatarUrl && originalAvatarUrl) {
    // DB에 저장된 원본 아바타 URL이 있는데, 아직 avatarUrl 세팅 중이면 로딩
    return <div>loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex">
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          data-testid="file-input"
        />
        <Avatar
          src={previewAvatarUrl}
          alt={username}
          name={username}
          size="xxl"
          className="relative"
        />
        <p
          onClick={imageClick}
          role="button"
          aria-label="camera"
          className="absolute -right-[7px] bottom-0 inline-block cursor-pointer rounded-full bg-neutral-300 p-1"
        >
          <Camera size={20} color="white" />
        </p>
      </div>
    </div>
  );
};
