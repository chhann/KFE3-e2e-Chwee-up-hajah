import { redirect } from 'next/navigation';

import { getProfile } from '../../../../features/profile/api/getProfile';
import { ProfileForm } from '../../../../pages/profile-update-page/ui';
import { getCurrentUser } from '../../../session';

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData?.id!);

  return <ProfileForm user={userProfile} />;
};

export default Page;
