import type { Dispatch, SetStateAction } from 'react';

import type { ZodFormattedError } from 'zod';

import { generateUploadUrl } from '../api/generateUploadUrl';

import { profileSchema } from '@/lib/validators/profileSchema';
import { ProfileFormType, UserProfileType } from '@/types/profile';

export function handleInputChange(
  identifier: string,
  value: string,
  setEnteredValues: Dispatch<SetStateAction<ProfileFormType>>
) {
  setEnteredValues((preValues) => ({
    ...preValues,
    [identifier]: value,
  }));
}

export interface UpdateProfileMutation {
  mutate: (data: {
    id: string;
    username: string;
    address: string;
    addressDetail: string;
    avatarUrl?: string;
  }) => void;
  isPending?: boolean;
}

export async function handleSubmit(
  e: React.FormEvent,
  user: UserProfileType,
  enteredValues: ProfileFormType,
  selectedFile: File | undefined,
  setFieldErrors: Dispatch<SetStateAction<ZodFormattedError<ProfileFormType> | undefined>>,
  updateProfileMutation: UpdateProfileMutation
) {
  e.preventDefault();
  setFieldErrors(undefined);

  const id = user.user_id;
  const { username, address, addressDetail } = enteredValues;

  let finalAvatarUrl: string | undefined = user.avatar;

  if (selectedFile) {
    try {
      const uploadedUrl = await generateUploadUrl(id, selectedFile);
      finalAvatarUrl = uploadedUrl;
    } catch (uploadError: any) {
      alert(`아바타 업로드 실패: ${uploadError.message}`);
      console.error('Avatar upload error:', uploadError);
      return; // 아바타 업로드 실패 시 전체 폼 제출 중단
    }
  }

  const result = profileSchema.safeParse({
    username,
    address,
    addressDetail,
  });

  if (!result.success) {
    const formatted = result.error.format();
    setFieldErrors(formatted);
    return;
  }

  updateProfileMutation.mutate({
    id,
    username,
    address,
    addressDetail,
    avatarUrl: finalAvatarUrl,
  });
}
