import { getProfile } from '../../../../features/profile/api/getProfile';
import { ProfileForm } from '../../../../pages/profile-update-page/ui';
import { getCurrentUser } from '../../../session';

const Page = async () => {
  const data = await getCurrentUser();
  const user = await getProfile(data?.id!);

  return <ProfileForm user={user} />;
};

export default Page;
