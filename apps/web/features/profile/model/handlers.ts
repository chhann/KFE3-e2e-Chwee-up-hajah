import type { Dispatch, SetStateAction } from 'react';

import type { ZodFormattedError } from 'zod';

import type { UserProfileType } from '@/widgets/profile';

import { profileSchema } from '@/lib/validators/profileSchema';

export type ProfileFormType = {
  username: string;
  address: string;
  addressDetail: string;
  avatarUrl?: string;
};

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
  avatarUrl: string | undefined,
  setFieldErrors: Dispatch<SetStateAction<ZodFormattedError<ProfileFormType> | undefined>>,
  updateProfileMutation: UpdateProfileMutation
) {
  e.preventDefault();
  const id = user.user_id;
  const { username, address, addressDetail } = enteredValues;

  const result = profileSchema.safeParse({
    username,
    address,
    addressDetail,
    avatarUrl,
  });

  if (!result.success) {
    const formatted = result.error.format();
    setFieldErrors(formatted);
    return;
  }

  updateProfileMutation.mutate({ id, username, address, addressDetail, avatarUrl });
}
