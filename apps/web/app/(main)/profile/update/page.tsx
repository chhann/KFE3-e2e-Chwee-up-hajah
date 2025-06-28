import { redirect } from 'next/navigation';

import { ProfileForm } from '@/widgets/profile/ui/ProfileForm';

import { getProfile } from '@/features/profile/api/getProfile';

import { getCurrentUser } from '@/app/session';

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData?.id!);

  return <ProfileForm user={userProfile} />;
};

export default Page;
