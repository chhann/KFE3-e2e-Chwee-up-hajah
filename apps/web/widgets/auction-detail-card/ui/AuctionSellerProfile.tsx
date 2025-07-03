import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';

import { AuctionDetail } from '@/types/db';
import {
  auctionSellerProfileAvatarStyle,
  auctionSellerProfileContainerStyle,
  auctionSellerProfileHeaderStyle,
  auctionSellerProfileInfoGrowStyle,
  auctionSellerProfileInfoHeaderStyle,
  auctionSellerProfileInfoRowStyle,
  auctionSellerProfileScoreStyle,
} from './style/AuctionSellerProfile.styles';

interface AuctionSellerProfileProps {
  user: AuctionDetail['seller'];
}

export const AuctionSellerProfile = ({ user }: AuctionSellerProfileProps) => {
  return (
    <section className={auctionSellerProfileContainerStyle}>
      <h1 id="profile-header-title">판매자 정보</h1>
      <div className={auctionSellerProfileInfoRowStyle}>
        <Avatar
          className={auctionSellerProfileAvatarStyle}
          src={user.avatar}
          alt={`${user.username} 프로필 이미지`}
          name={user.username || '사용자'}
          size="lg"
        />
        <div className={auctionSellerProfileInfoGrowStyle}>
          <header className={auctionSellerProfileInfoHeaderStyle}>
            <h3 className={auctionSellerProfileHeaderStyle}>{user.username}</h3>
          </header>
          <div className={auctionSellerProfileScoreStyle}>
            온도 {user.score} · 판매 {user.selling_auction?.length || 0}
          </div>

          <LocationInfo address={user.address} />
        </div>
      </div>
    </section>
  );
};
