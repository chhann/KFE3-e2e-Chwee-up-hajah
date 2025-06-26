import { redirect } from 'next/navigation';
import { getProfile } from '../../../features/profile/api/getProfile';
import { ProfilePageClient } from '../../../pages/profile-page/ui/client';
import { getCurrentUser } from '../../session';

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData?.id!);

  return <ProfilePageClient initialUser={userProfile} />;
};

export default Page;
