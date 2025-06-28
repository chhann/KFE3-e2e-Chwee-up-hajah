import { redirect } from 'next/navigation';

import { getProfile } from '../../../features/profile/api/getProfile';
import { ProfilePage } from '../../../pages/profile-page';
import { getCurrentUser } from '../../session';

const Page = async () => {
  const userData = await getCurrentUser();

  if (!userData) {
    redirect('/login');
  }

  const userProfile = await getProfile(userData?.id!);

  return <ProfilePage user={userProfile} />;
};

export default Page;
