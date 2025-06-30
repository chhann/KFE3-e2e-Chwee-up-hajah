'use client';

import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { ZodFormattedError } from 'zod';

import { handleInputChange, handleSubmit } from '@/features/profile/model/handlers';
import { ProfileAvatarUpload } from '@/features/profile/ui/ProfileAvatarUpload';

import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import { ProfileFormType, UserProfileType } from '@/types/profile';

export const ProfileForm = ({ user }: { user: UserProfileType }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user.avatar);
  const [enteredValues, setEnteredValues] = useState<ProfileFormType>({
    username: user.username,
    address: user.address,
    addressDetail: user['address_detail'],
  });

  const [fieldErrors, setFieldErrors] = useState<ZodFormattedError<ProfileFormType> | undefined>(
    undefined
  );

  const updateProfileMutation = useUpdateProfile();

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">내 정보 수정</h1>
      <ProfileAvatarUpload
        id={user.user_id}
        username={user.username}
        prevUrl={user.avatar}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
      <form
        onSubmit={(e) =>
          handleSubmit(e, user, enteredValues, avatarUrl, setFieldErrors, updateProfileMutation)
        }
      >
        <section className="mt-4 flex w-full max-w-md flex-col gap-4">
          <div className="flex flex-col">
            <Input
              label="닉네임"
              placeholder={user.username}
              value={enteredValues.username}
              onChange={(event) =>
                handleInputChange('username', event.target.value, setEnteredValues)
              }
            />
            {fieldErrors?.username && (
              <div className="my-1 ml-1 text-xs text-red-500">
                {fieldErrors.username._errors[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Input label="이메일" value={user.email} disabled />
          </div>
          <div className="flex flex-col">
            <Input
              label="주소"
              value={enteredValues.address}
              onChange={(event) =>
                handleInputChange('address', event.target.value, setEnteredValues)
              }
            />
            {fieldErrors?.address && (
              <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.address._errors[0]}</div>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              label="상세주소"
              value={enteredValues.addressDetail}
              onChange={(event) =>
                handleInputChange('addressDetail', event.target.value, setEnteredValues)
              }
            />
          </div>
          <Button variants="primary" type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending ? '제출 중...' : '정보 변경'}
          </Button>
        </section>
      </form>
    </main>
  );
};
