'use client';

import { useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { FaCamera } from 'react-icons/fa6';

interface AvatarUploadProps {
  username: string;
  avatarUrl?: string; // ProfileForm에서 관리하는 현재 미리보기 URL
  onFileSelect: (file: File | undefined) => void; // 선택된 File 객체를 상위로 전달하는 콜백
}

export const ProfileAvatarUpload = ({
  username,
  avatarUrl, // ProfileForm에서 이미 캐시 버스터가 붙어 전달된 URL 사용
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
    } else {
      // 파일 선택 취소 시
      // 파일이 선택되지 않았음을 상위 컴포넌트(ProfileForm)로 전달.
      // 상위 컴포넌트가 이 정보를 가지고 미리보기 URL을 기존(DB) 아바타로 되돌림.
      onFileSelect(undefined);
    }
  };

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
        <Avatar src={avatarUrl} alt={username} name={username} size="xxl" className="relative" />
        <p
          onClick={imageClick}
          role="button"
          aria-label="camera"
          className="border-3 absolute -right-[7px] bottom-0 inline-block cursor-pointer rounded-full border-solid border-white bg-neutral-500 p-1"
        >
          <FaCamera className="size-3.5 text-white" />
        </p>
      </div>
    </div>
  );
};
