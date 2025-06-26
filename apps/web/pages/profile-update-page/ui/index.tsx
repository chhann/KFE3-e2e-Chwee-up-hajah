'use client';
import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { z, ZodFormattedError } from 'zod';

import { useUpdateProfile } from '../../../hooks/profile/useUpdateProfile';
import { profileSchema } from '../../../lib/validators/profileSchema';
import { UserProfileType } from '../../../widgets/profile';

type ProfileFormType = z.infer<typeof profileSchema>;

export const ProfileForm = ({ user }: { user: UserProfileType }) => {
  const [enteredValues, setEnteredValues] = useState({
    username: user.username,
    address: user.address,
    addressDetail: user['address_detail'],
  });

  const [fieldErrors, setFieldErrors] = useState<ZodFormattedError<ProfileFormType> | undefined>(
    undefined
  );

  const updateProfileMutation = useUpdateProfile();

  const handleInputChange = (identifier: string, value: string) => {
    setEnteredValues((preValues) => ({
      ...preValues,
      [identifier]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = user['user_id'];
    const { username, address, addressDetail } = enteredValues;

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

    updateProfileMutation.mutate({ id, username, address, addressDetail });
  };

  return (
    <main className="text-neutral-70" role="main">
      <h1 className="mb-3 text-base font-semibold">내 정보 수정</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              label="닉네임"
              placeholder={user.username}
              value={enteredValues.username}
              onChange={(event) => handleInputChange('username', event.target.value)}
            />
            {fieldErrors?.username && <p>{fieldErrors.username._errors[0]}</p>}
          </div>
          <div className="flex flex-col">
            <Input label="이메일" value={user.email} disabled />
          </div>
          <div className="flex flex-col">
            <Input
              label="주소"
              value={enteredValues.address}
              onChange={(event) => handleInputChange('address', event.target.value)}
            />
            {fieldErrors?.address && <p>{fieldErrors.address._errors[0]}</p>}
          </div>
          <div className="flex flex-col">
            <Input
              label="상세주소"
              value={enteredValues.addressDetail}
              onChange={(event) => handleInputChange('addressDetail', event.target.value)}
            />
          </div>
          <Button variants="primary" type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending ? '제출 중...' : '정보 변경'}
          </Button>
        </form>
      </section>
    </main>
  );
};
