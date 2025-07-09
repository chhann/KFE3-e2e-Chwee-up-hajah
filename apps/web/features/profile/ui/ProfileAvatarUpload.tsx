import { useRef } from 'react';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { FaCamera } from 'react-icons/fa6';

import { supabase } from '@/shared/lib/supabase/supabase';

interface AvatarUploadProps {
  id: string;
  username: string;
  prevUrl?: string;
  avatarUrl?: string;
  setAvatarUrl: (value: string | undefined) => void;
}

export const ProfileAvatarUpload = ({
  id,
  username,
  prevUrl,
  avatarUrl,
  setAvatarUrl,
}: AvatarUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const imageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${id}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
      setAvatarUrl(urlData.publicUrl + '?t=' + Date.now()); // 쿼리 파라미터로 캐시 무력화
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex">
        <input ref={imageRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
        <Avatar
          src={avatarUrl || prevUrl}
          alt={username}
          name={username}
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
