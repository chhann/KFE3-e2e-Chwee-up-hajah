import { redirect } from 'next/navigation';

import { ProfileForm } from '@/widgets/profile/ui/ProfileForm';

import { getProfile } from '@/shared/api/server/profile/getProfile';

const Page = async () => {
  try {
    const userProfile = await getProfile();

    return <ProfileForm user={userProfile} />;
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      redirect('/login');
    }
    console.error('Profile page error:', error);
  }
};

export default Page;
