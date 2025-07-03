'use client';

import { useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { FaCamera } from 'react-icons/fa6';

import { profileAvatarUploadStyles as styles } from '../styles/profileAvatarUpload.styles';

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
    }
  };

  if (!avatarUrl) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleImageChange}
          data-testid="file-input"
        />
        <Avatar
          src={avatarUrl}
          alt={username}
          name={username}
          size="xxl"
          className={styles.avatar}
        />
        <p onClick={imageClick} role="button" aria-label="camera" className={styles.cameraButton}>
          <FaCamera className={styles.cameraIcon} />
        </p>
      </div>
    </div>
  );
};
