import { useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { FaCamera } from 'react-icons/fa6';

import { supabase } from '../../../lib/supabase/supabase';

interface AvatarUploadProps {
  id: string;
  prevUrl?: string;
  avatarUrl?: string;
  setAvatarUrl: (value: string | undefined) => void;
}

export const AvatarUpload = ({ id, prevUrl, avatarUrl, setAvatarUrl }: AvatarUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const imageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();

      try {
        // 기존 파일들 삭제
        const { data: existingFiles } = await supabase.storage.from('avatars').list('', {
          search: id,
        });

        if (existingFiles && existingFiles.length > 0) {
          const filesToDelete = existingFiles.map((file) => file.name);
          await supabase.storage.from('avatars').remove(filesToDelete);
        }

        // 고정된 파일명으로 새 파일 업로드
        const filePath = `${id}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
        setAvatarUrl(`${urlData.publicUrl}?t=${Date.now()}`); // 캐시 방지
      } catch (error) {
        console.error('파일 업로드 중 오류:', error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex">
        <input ref={imageRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
        <Avatar
          src={avatarUrl || prevUrl}
          alt="프로필 이미지"
          name="사용자"
          size="xxl"
          className="relative"
        />
        <p
          onClick={imageClick}
          className="border-3 absolute -right-[7px] bottom-0 inline-block cursor-pointer rounded-full border-solid border-white bg-neutral-500 p-1"
        >
          <FaCamera className="size-3.5 text-white" />
        </p>
      </div>
    </div>
  );
};
