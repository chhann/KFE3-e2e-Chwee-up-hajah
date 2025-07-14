import { redirect } from 'next/navigation';

import { ProfileForm } from '@/widgets/profile/ui/ProfileForm';

import { getCurrentUser } from '@/app/session';

import { getProfile } from '@/shared/api/server/profile/getProfile';

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData.id!);

  return <ProfileForm user={userProfile} />;
};

export default Page;
