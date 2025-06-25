import { ProfilePage } from '../../../pages/profile-page';
import { getCurrentUser } from '../../session';

const Page = async () => {
  const user = await getCurrentUser();

  return <ProfilePage user={user!.user_metadata} />;
};

export default Page;
